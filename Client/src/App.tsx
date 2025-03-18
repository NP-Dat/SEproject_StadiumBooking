import { RouterProvider } from "react-router-dom";
import { router } from "./route/Router.tsx";

export default function App() {
  return <RouterProvider router={router} />;
}
