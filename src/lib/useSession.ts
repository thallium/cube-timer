import { useCallback, useEffect, useRef, useState } from "react";
import { EventID } from "./events";
import { AttemptData } from "./attempt-data";
import PouchDB from "pouchdb-browser";
import { Alg } from "cubing/alg";

export type Session = {
  _id: string; // id is the name of the group
  event: EventID;
};

export function useSession() {
  const db = useRef(new PouchDB("sessions"));
  const [sessions, setSessions] = useState<Session[]>([]);
  useEffect(() => {
    const init = async () => {
      let res = await db.current.allDocs();
      if (res.total_rows === 0) {
        await db.current.put({
          _id: "default",
          event: "333",
        } as Session);
      }
      res = await db.current.allDocs({ include_docs: true });
      setSessions(res.rows.map((row) => row.doc as unknown as Session));
    };
    init();
  }, [db]);

  const [session, setSession] = useState<Session>();
  const [attempts, setAttempts] = useState<AttemptData[]>([]);
  const attemptDB = useRef<PouchDB.Database>(new PouchDB("session_default"));

  if (!session && sessions.length > 0) {
    setSession(sessions[0]);
    attemptDB.current = new PouchDB("session_" + sessions[0]._id);
    attemptDB.current.allDocs({ include_docs: true }).then((res) => {
      setAttempts(res.rows.map((row) => row.doc as unknown as AttemptData));
    });
  }

  const changeSession = useCallback(
    (name: string) => {
      db.current.get(name).then((res) => {
        setSession(res as unknown as Session);
      });
      attemptDB.current = new PouchDB("session_" + name);
      attemptDB.current.allDocs({ include_docs: true }).then((res) => {
        setAttempts(res.rows.map((row) => row.doc as unknown as AttemptData));
      });
    },
    [db, attemptDB]
  );

  const createSession = useCallback(
    (name: string) => {
      if (!name) return;
      db.current
        .put({
          _id: name,
          event: "333",
        } as Session)
        .then((res) => {
          db.current.allDocs({ include_docs: true }).then((res) => {
            setSessions(res.rows.map((row) => row.doc as unknown as Session));
          });
          console.log(res);
        });
    },
    [db]
  );

  const setAttemptsFromDB = useCallback(() => {
    attemptDB.current.allDocs({ include_docs: true }).then((res) => {
      setAttempts(res.rows.map((row) => row.doc as unknown as AttemptData));
    });
  }, []);

  const addAttempt = useCallback(
    (time: number, scramble: Alg | undefined) => {
      const date = Date.now();
      const attempt: AttemptData = {
        _id: date.toString(),
        unixDate: date,
        totalResultMs: time,
        scramble: scramble?.toString(),
      };
      attemptDB.current.put(attempt).then(() => {
        setAttemptsFromDB();
      });
    },
    [attemptDB, setAttemptsFromDB]
  );

  const deleteAttempt = useCallback(
    (id: string) => {
      attemptDB.current
        .get(id)
        .then((doc) => {
          return attemptDB.current.remove(doc);
        })
        .then(() => {
          setAttemptsFromDB();
        });
    },
    [attemptDB, setAttemptsFromDB]
  );

  const changeEvent = useCallback(
    (name: EventID) => {
      if (!session) return;
      db.current.get(session._id).then((doc) => {
        return db.current.put({
          _id: session._id,
          _rev: doc._rev,
          event: name,
        });
      });
      setSession({ ...session, event: name });
    },
    [db, session]
  );

  return {
    currentSession: session,
    sessions: sessions,
    changeSession,
    createSession,
    addAttempt,
    deleteAttempt,
    attempts,
    changeEvent,
  };
}

export type SessionType = ReturnType<typeof useSession>;
