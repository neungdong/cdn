import { RouterProvider } from "react-router";
import { useMyInfoQuery } from "./hooks/auth/useAuth";
import { router } from "./pages/routes/router";
import { enableMapSet } from "immer";
import { socketClient } from "./libs/socket/socketClient";
import { useEffect } from "react";
enableMapSet();

function App() {
  // const { isLoading } = useMyInfoQuery();

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  useEffect(() => {
    socketClient.connect();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
