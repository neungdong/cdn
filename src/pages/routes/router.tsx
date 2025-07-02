import { createBrowserRouter } from "react-router";
import HomePage from "../HomePage";
import PlaygroundPage from "../PlaygroundPage";
import LoginPage from "../LoginPage";
import PublicOnlyRoute from "./PublicOnlyRoute";
import ProtectedRoute from "./ProtectedRoute";
import NotFoundPage from "../NotFoundPage";
import StreamingDemoPage from "../StreamingDemoPage";
import DiaryInputForm from "../../components/DiaryInputForm"; // 경로 주의!
import ChatPage from "../../components/ChatPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/ai",
        element: <ChatPage />,
      },
      {
        path: "/playground",
        element: <PlaygroundPage />,
      },
      {
        path: "/str",
        element: <StreamingDemoPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/summery",
        element: <DiaryInputForm />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
