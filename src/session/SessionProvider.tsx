import { AttemptData } from "@/lib/attempt-data";
import { EventID } from "@/lib/events";
import { getSetting } from "@/lib/settings";
import { Session } from "@/session/index";
import { notifications } from "@mantine/notifications";
import { Alg } from "cubing/alg";
import PouchDB from "pouchdb-browser";
import { createContext, useCallback, useEffect, useRef, useState } from "react";

interface Sessions {
  sessions: Session[];
}

type SessionType = {
  currentSession: Session | undefined;
  sessions: Session[];

  changeSession: (name: string) => void;
  createSession: (name: string) => Promise<void>;
  setSessions: (sessions: Session[]) => Promise<void>;
  deleteSession: (name: string) => Promise<void>;

  attempts: AttemptData[];
  addAttempt: (time: number, scramble: Alg | undefined) => void;
  deleteAttempt: (id: string) => Promise<void>;
  changeEvent: (name: EventID) => Promise<void>;

  syncWithRemoteDB: () => Promise<void>;
};

export const SessionContext = createContext<SessionType | undefined>(undefined);

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dataDB = useRef(new PouchDB("data"));
  const attemptDB = useRef<PouchDB.Database>(new PouchDB("attempts"));
  const attemptsSync = useRef<PouchDB.Replication.Sync<object>>();
  const dataSync = useRef<PouchDB.Replication.Sync<object>>();

  const [sessions, setSessionsState] = useState<Session[]>([]);
  const [session, setSession] = useState<Session>();
  const [attempts, setAttempts] = useState<AttemptData[]>([]);

  const setAttemptsFromDB = async () => {
    const res = await attemptDB.current.allDocs({ include_docs: true });
    setAttempts(res.rows.map((row) => row.doc as unknown as AttemptData));
  };

  const loadFromDB = useCallback(async () => {
    let sessionsTmp: Session[];
    // Create default session if it doesn't exist
    try {
      sessionsTmp = ((await dataDB.current.get("sessions")) as Sessions)
        .sessions;
    } catch (e) {
      sessionsTmp = [
        {
          name: "default",
          event: "333",
          createdAt: Date.now(),
        } as Session,
      ];
      await dataDB.current.put({
        _id: "sessions",
        sessions: sessionsTmp,
      });
    }
    setSessionsState(sessionsTmp);
    // TODO: save the last session in local storage
    setSession(sessionsTmp[0]);

    await setAttemptsFromDB();
  }, []);

  const syncWithRemoteDB = useCallback(async () => {
    try {
      attemptsSync.current?.cancel();

      dataSync.current = PouchDB.sync(
        "data",
        getSetting("remoteDB") + "/data",
        {
          live: true,
          retry: true,
        },
      );
      attemptsSync.current = PouchDB.sync(
        "attempts",
        getSetting("remoteDB") + "/attempts",
        {
          live: true,
          retry: true,
        },
      );
    } catch (e) {
      console.error(e);
    }
    await loadFromDB();
  }, [loadFromDB]);

  useEffect(() => {
    loadFromDB();
    syncWithRemoteDB();

    const attemptDbChanges = attemptDB.current
      .changes({
        since: "now",
        live: true,
        include_docs: true,
      })
      .on("change", (change) => {
        if (change.deleted) {
          setAttempts((attempts) =>
            attempts.filter((a) => a._id !== change.id),
          );
        } else {
          setAttempts((attempts) => [
            ...attempts,
            change.doc as unknown as AttemptData,
          ]);
        }
      });

    const dataDbChanges = dataDB.current
      .changes({
        since: "now",
        live: true,
        include_docs: true,
      })
      .on("change", (change) => {
        if (!change.deleted && change.doc?._id === "sessions") {
          const newSessions = (change.doc as unknown as Sessions).sessions;
          // if (!newSessions.some((s) => s.name === session?.name)) {
          //   setSession(newSessions[0]);
          // }
          setSessionsState(newSessions);
        }
      });
    return () => {
      attemptDbChanges.cancel();
      dataDbChanges.cancel();
    };
  }, [loadFromDB, syncWithRemoteDB]);

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
      // setSessionsState(sessions);
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
      notifications.show({
        title: "Can't delete the last session",
        message: "",
        color: "red",
      });
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
    attemptDB.current.put(attempt);
  };

  const deleteAttempt = async (id: string) => {
    const doc = await attemptDB.current.get(id);
    await attemptDB.current.remove(doc);
  };

  const changeEvent = async (name: EventID) => {
    if (!session) return;

    const newSessions = [...sessions];
    newSessions.find((s) => s.name === session.name)!.event = name;
    setSessions(newSessions);
  };

  return (
    <SessionContext.Provider
      value={{
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
        syncWithRemoteDB,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
