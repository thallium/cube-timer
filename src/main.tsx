import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={{ defaultRadius: "md" }}>
      <Notifications />
      <App />
    </MantineProvider>
  </React.StrictMode>,
);
