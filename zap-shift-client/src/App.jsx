import { RouterProvider } from "react-router";
import { router } from "./router/router";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

function App() {
  AOS.init();
  return (
    <div className="font-urbanist bg-white " >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
