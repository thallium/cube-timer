import { AttemptData } from "./lib/attempt-data";
import { Session } from "./lib/useSession";
import MobileLayout from "./mobile-layout";
import Stats from "./results";

function MobileResults({
  attempts,
  currentSession,
  sessions,
  changeSession,
  createSession,
  deleteAttempt,
}: {
  className?: string;
  attempts: AttemptData[];
  currentSession: Session | undefined;
  sessions: Session[];
  changeSession: (name: string) => void;
  createSession: (name: string) => void;
  deleteAttempt: (id: string) => void;
}) {
  return (
    <MobileLayout>
      <Stats
        attempts={attempts}
        currentSession={currentSession}
        sessions={sessions}
        changeSession={changeSession}
        createSession={createSession}
        deleteAttempt={deleteAttempt}
        className="grow"
      />
    </MobileLayout>
  );
}

export default MobileResults;
