import { useAllDocs, usePouch } from "use-pouchdb";
import { useCallback, useState } from "react";
import { EventID } from "./events";
import { AttemptData } from "./attempt-data";

export type Session = {
  _id: string; // id is the name of the group
  event: EventID;
  attempts: AttemptData[];
};

export function useSession() {
  const db = usePouch();
  if (useAllDocs().rows.length === 0) {
    // create a new session
    db.put({
      _id: "1",
      event: "333",
      attempts: [],
    } as Session);
  }

  const { rows } = useAllDocs({
    include_docs: true,
  });

  const sessions = rows.map((row) => row.doc as unknown as Session);

  const [session, setSession] = useState<Session>();

  if (!session && sessions.length > 0) {
    setSession(sessions[0]);
  }

  const changeSession = useCallback(
    (name: string) => {
      db.get(name).then((res) => {
        setSession(res as unknown as Session);
      });
    },
    [db]
  );

  const createSession = useCallback(
    (name: string) => {
      db.put({
        _id: name,
        event: "333",
        attempts: [],
      } as Session).then((res) => {
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
      const newSession = session
        ? { ...session, attempts: [...session.attempts, attempt] }
        : undefined;
      if (session) {
        db.get(session._id)
          .then((res) => {
            return db.put({ _id: res._id, _rev: res._rev, ...newSession });
          })
          .then((res) => {
            console.log("attempt added", res);
          })
          .catch((err) => {
            console.error(err);
          });
      }
      db.put(attempt);
    },
    [db, session]
  );

  return {
    currentSession: session,
    sessions,
    changeSession,
    createSession,
    addAttempt,
  };
}
