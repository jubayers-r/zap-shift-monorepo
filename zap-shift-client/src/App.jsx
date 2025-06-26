import { RouterProvider } from "react-router";
import { router } from "./router/router";

function App() {
  return (
    <div className="font-urbanist">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
