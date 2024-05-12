import { useCallback, useEffect, useRef, useState } from "react";
import { EventID } from "./events";
import { AttemptData } from "./attempt-data";
import PouchDB from "pouchdb-browser";

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

  const addAttempt = useCallback(
    (time: number) => {
      const date = Date.now();
      const attempt: AttemptData = {
        _id: date.toString(),
        unixDate: date,
        totalResultMs: time,
      };
      console.log("attempt db", attemptDB.current.name);
      attemptDB.current.put(attempt).then(() => {
        attemptDB.current.allDocs({ include_docs: true }).then((res) => {
          setAttempts(res.rows.map((row) => row.doc as unknown as AttemptData));
        });
      });
    },
    [attemptDB]
  );

  return {
    currentSession: session,
    sessions: sessions,
    changeSession,
    createSession,
    addAttempt,
    attempts,
  };
}
