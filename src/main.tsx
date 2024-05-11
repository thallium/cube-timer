import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import PouchDB from "pouchdb-browser";
import { Provider } from "use-pouchdb";
import { NextUIProvider } from "@nextui-org/system";
// import SessionProvider, { useSession } from "./sessionProvider.tsx";

// const sessionDB = new PouchDB("sessions");
const db = new PouchDB("results");

// function AppWithDB() {
//   const { currentSession } = useSession();
//   const db = new PouchDB("session_" + currentSession?._id);
//   return (
//     <Provider pouchdb={db}>
//       <App />
//     </Provider>
//   );
// }

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      {/* <Provider pouchdb={sessionDB}> */}
      {/* <SessionProvider> */}
      {/* <AppWithDB /> */}
      <Provider pouchdb={db}>
        <App />
      </Provider>
      {/* </SessionProvider> */}
      {/* </Provider> */}
    </NextUIProvider>
  </React.StrictMode>
);
