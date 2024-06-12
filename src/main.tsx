import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import SingleAttemptModal from "./components/modal/SingleAttemptModal.tsx";
import { SessionProvider } from "./session/SessionProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={{ defaultRadius: "md" }}>
      <SessionProvider>
        <ModalsProvider modals={{ singleAttempt: SingleAttemptModal }}>
          <Notifications />
          <App />
        </ModalsProvider>
      </SessionProvider>
    </MantineProvider>
  </React.StrictMode>,
);
