import { getSetting } from "@/lib/settings";
import { Alg } from "cubing/alg";
import PouchDB from "pouchdb-browser";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AttemptData } from "./attempt-data";
import { EventID } from "./events";

export type Session = {
  _id: string; // id is the name of the group
  event: EventID;
};

export function useSession() {
  const sessionsDB = useRef(new PouchDB("sessions"));
  const attemptDB = useRef<PouchDB.Database>(new PouchDB("attempts"));

  const [sessions, setSessions] = useState<Session[]>([]);
  const [session, setSession] = useState<Session>();
  const [attempts, setAttempts] = useState<AttemptData[]>([]);

  const setAttemptsFromDB = useCallback(async () => {
    const res = await attemptDB.current.allDocs({ include_docs: true });
    setAttempts(res.rows.map((row) => row.doc as unknown as AttemptData));
  }, []);

  useEffect(() => {
    (async () => {
      // Create default session if it doesn't exist
      let res = await sessionsDB.current.allDocs();
      if (res.total_rows === 0) {
        await sessionsDB.current.put({
          _id: "default",
          event: "333",
        } as Session);
      }

      // Set current session and sessions
      res = await sessionsDB.current.allDocs({ include_docs: true });
      setSessions(res.rows.map((row) => row.doc as unknown as Session));
      // TODO: save the last session in local storage
      setSession(res.rows[0].doc as unknown as Session);

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

  const changeSession = useCallback(
    (name: string) => {
      sessionsDB.current.get(name).then((res) => {
        setSession(res as unknown as Session);
        setAttemptsFromDB();
      });
    },
    [setAttemptsFromDB],
  );

  const createSession = useCallback(async (name: string) => {
    if (!name) return;

    await sessionsDB.current.put({
      _id: name,
      event: "333",
    } as Session);
    const res = await sessionsDB.current.allDocs({ include_docs: true });
    setSessions(res.rows.map((row) => row.doc as unknown as Session));
  }, []);

  const addAttempt = useCallback(
    (time: number, scramble: Alg | undefined) => {
      const date = Date.now();
      const attempt: AttemptData = {
        _id: date.toString(),
        unixDate: date,
        totalResultMs: time,
        scramble: scramble?.toString(),
        event: session?.event,
        session: session?._id || "default",
      };
      attemptDB.current.put(attempt).then(() => {
        setAttemptsFromDB();
      });
    },
    [session?._id, session?.event, setAttemptsFromDB],
  );

  const deleteAttempt = useCallback(
    async (id: string) => {
      const doc = await attemptDB.current.get(id);
      await attemptDB.current.remove(doc);
      await setAttemptsFromDB();
    },
    [setAttemptsFromDB],
  );

  const changeEvent = useCallback(
    async (name: EventID) => {
      if (!session) return;

      setSession({ ...session, event: name });
      const doc = await sessionsDB.current.get(session._id);
      await sessionsDB.current.put({
        _id: session._id,
        _rev: doc._rev,
        event: name,
      });
    },
    [session],
  );

  const loadFromDB = useCallback(() => {
    sessionsDB.current.allDocs({ include_docs: true }).then((res) => {
      setSessions(res.rows.map((row) => row.doc as unknown as Session));
      setAttemptsFromDB();
    });
  }, [setAttemptsFromDB]);

  return useMemo(
    () => ({
      currentSession: session,
      sessions: sessions,
      changeSession,
      createSession,
      addAttempt,
      deleteAttempt,
      attempts,
      changeEvent,
      loadFromDB,
    }),
    [
      addAttempt,
      attempts,
      changeEvent,
      changeSession,
      createSession,
      deleteAttempt,
      loadFromDB,
      session,
      sessions,
    ],
  );
}

export type SessionType = ReturnType<typeof useSession>;
