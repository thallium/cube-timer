import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { SessionProvider } from "./session/SessionProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={{ defaultRadius: "md" }}>
      <SessionProvider>
        <Notifications />
        <App />
      </SessionProvider>
    </MantineProvider>
  </React.StrictMode>,
);
