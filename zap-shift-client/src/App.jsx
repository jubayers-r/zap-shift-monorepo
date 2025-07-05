import { RouterProvider } from "react-router";
import { router } from "./router/router";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import AuthProvider from "./context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  AOS.init();
  const queryClient = new QueryClient();
  return (
    <div className="font-urbanist bg-[#eaeced] ">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
