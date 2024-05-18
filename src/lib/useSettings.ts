import { useState } from "react";

export function useSettings(): {
  remoteDB: [string, (url: string) => void];
} {
  const [remoteDB, setRemoteDB] = useState(
    localStorage.getItem("remoteDB") || "",
  );
  return {
    remoteDB: [
      remoteDB,
      (url: string) => {
        localStorage.setItem("remoteDB", url);
        setRemoteDB(url);
      },
    ],
  };
}
