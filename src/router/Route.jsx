import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import HomePage from "../pages/HomePage";
import GamePage from "../pages/GamePage";
import GameExtraPage from "../pages/GameExtraPage";
import ManagePage from "../pages/ManagePage";
import ResultPage from "../pages/ResultPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/gamePage", element: <GamePage /> },  
  { path: "/gameExtraPage", element: <GameExtraPage /> },
  { path: "/managePage", element: <ManagePage /> },
  { path: "/resultPage", element: <ResultPage /> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
