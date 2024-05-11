import React, { useEffect, useRef, useState } from "react";
import { useAllDocs, usePouch } from "use-pouchdb";
import { Session } from "./lib/session";

type SessionContextValueType = {
  currentSession: Session;
  sessions: Session[];
  changeSession: (name: string | undefined) => void;
  createSession: (name: string) => void;
};

const sessionContext = React.createContext<SessionContextValueType | undefined>(
  undefined
);

function SessionProvider({ children }: { children: React.ReactNode }) {
  const db = usePouch();
  const { rows } = useAllDocs({
    include_docs: true,
  });

  useEffect(() => {
    if (rows.length === 0) {
      db.put({
        _id: "1",
        event: "333",
      } as Session);
    }
  }, [db, rows.length]);

  const sessions = useRef(rows.map((row) => row.doc as unknown as Session));
  const [session, setSession] = useState<Session>(sessions.current[0]);
  const changeSession = (name: string | undefined) => {
    if (!name) return;
    db.get(name).then((res) => {
      setSession(res as unknown as Session);
    });
  };
  const createSession = (name: string) => {
    db.put({
      _id: name,
      event: "333",
    } as Session).then((res) => {
      console.log(res);
    });
  };

  return (
    <sessionContext.Provider
      value={{
        currentSession: session,
        sessions: sessions.current,
        changeSession,
        createSession,
      }}
    >
      {children}
    </sessionContext.Provider>
  );
}

export default SessionProvider;

export function useSession() {
  const context = React.useContext(sessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
