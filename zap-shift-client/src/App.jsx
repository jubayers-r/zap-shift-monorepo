import { RouterProvider } from "react-router";
import { router } from "./router/router";

function App() {
  return (
    <div className="font-urbanist w-10/11 mx-auto py-7">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
