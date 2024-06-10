import Collapse from "@/components/ui/collapse";
import { RemoteDbInput, SyncButton } from "./Sync";
import ThemeButtons from "./ThemeButtons";
import UpdateSW from "./UpdateSW";

const MobileSettings: React.FC = () => {
  return (
    <>
      <h1 className="my-4 text-4xl">Settings</h1>
      <div className="flex flex-col gap-4 text-lg">
        <Collapse title="Remote Database" className="text-lg">
          <div className="space-y-2 py-2">
            <RemoteDbInput />
            <SyncButton />
          </div>
        </Collapse>
        <UpdateSW />
        <div className="flex items-center justify-between">
          <p>Theme</p>
          <ThemeButtons />
        </div>
      </div>
    </>
  );
};

export default MobileSettings;
