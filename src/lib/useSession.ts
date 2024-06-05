import { getSetting } from "@/lib/settings";
import { Alg } from "cubing/alg";
import PouchDB from "pouchdb-browser";
import { useEffect, useRef, useState } from "react";
import { AttemptData } from "./attempt-data";
import { EventID } from "./events";

interface Sessions {
  sessions: Session[];
}

export type Session = {
  name: string; // id is the name of the group
  event: EventID;
  createdAt?: number;
};

export function useSession() {
  const dataDB = useRef(new PouchDB("data"));
  const attemptDB = useRef<PouchDB.Database>(new PouchDB("attempts"));

  const [sessions, setSessionsState] = useState<Session[]>([]);
  const [session, setSession] = useState<Session>();
  const [attempts, setAttempts] = useState<AttemptData[]>([]);

  const setAttemptsFromDB = async () => {
    const res = await attemptDB.current.allDocs({ include_docs: true });
    setAttempts(res.rows.map((row) => row.doc as unknown as AttemptData));
  };

  useEffect(() => {
    (async () => {
      // Create default session if it doesn't exist
      try {
        await dataDB.current.get("sessions");
      } catch (e) {
        await dataDB.current.put({
          _id: "sessions",
          sessions: [
            {
              name: "default",
              event: "333",
              createdAt: Date.now(),
            } as Session,
          ],
        });
      }

      // Set current session and sessions
      const sessionsTmp = ((await dataDB.current.get("sessions")) as Sessions)
        .sessions;
      setSessionsState(sessionsTmp);
      // TODO: save the last session in local storage
      setSession(sessionsTmp[0]);

      // Set attempts
      await setAttemptsFromDB();

      try {
        PouchDB.sync("attempts", getSetting("remoteDB") + "/attempts", {
          live: true,
          retry: true,
        });
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const changeSession = (name: string) => {
    setSession(sessions.find((s) => s.name === name));
  };

  const setSessions = async (sessions: Session[]) => {
    try {
      const doc = await dataDB.current.get("sessions");
      dataDB.current.put({
        _id: "sessions",
        _rev: doc._rev,
        sessions,
      });
      setSessionsState(sessions);
    } catch (e) {
      console.error(e);
    }
  };

  const createSession = async (name: string) => {
    if (!name) return;

    setSessions([
      ...sessions,
      { name, event: "333", createdAt: Date.now() } as Session,
    ]);
  };

  const deleteSession = async (toDelete: string) => {
    const newSessions = sessions.filter((s) => s.name !== toDelete);
    if (newSessions.length === 0) {
      alert("Can't delete the last session");
      return;
    }
    setSessions(newSessions);
    setSession(newSessions[0]);
    const toDeleteAttempts = attempts
      .filter((a) => a.session === toDelete)
      .map((a) => {
        (a as AttemptData & { _deleted: boolean })._deleted = true;
        return a;
      });
    await attemptDB.current.bulkDocs(toDeleteAttempts);
    setAttemptsFromDB();
  };

  const addAttempt = (time: number, scramble: Alg | undefined) => {
    const date = Date.now();
    const attempt: AttemptData = {
      _id: date.toString(),
      unixDate: date,
      totalResultMs: time,
      scramble: scramble?.toString(),
      event: session?.event,
      session: session?.name || "default",
    };
    attemptDB.current.put(attempt).then(() => {
      setAttemptsFromDB();
    });
  };

  const deleteAttempt = async (id: string) => {
    const doc = await attemptDB.current.get(id);
    await attemptDB.current.remove(doc);
    await setAttemptsFromDB();
  };

  const changeEvent = async (name: EventID) => {
    if (!session) return;

    const newSessions = [...sessions];
    newSessions.find((s) => s.name === session.name)!.event = name;
    setSessions(newSessions);
  };

  const loadFromDB = async () => {
    const sessionsTmp = ((await dataDB.current.get("sessions")) as Sessions)
      .sessions;
    setSessionsState(sessionsTmp);
    // TODO: save the last session in local storage
    setSession(sessionsTmp[0]);
  };

  return {
    currentSession: session,
    sessions: sessions,
    changeSession,
    createSession,
    setSessions,
    deleteSession,
    attempts,
    addAttempt,
    deleteAttempt,
    changeEvent,
    loadFromDB,
  };
}

export type SessionType = ReturnType<typeof useSession>;
