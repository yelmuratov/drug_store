import Layout from "./layout/rootlayout.tsx";
import SignUp from "./pages/signUp.tsx";
import { useRoutes } from "react-router-dom";
import Home from "./pages/home.tsx";
import Contact from "./pages/contact.tsx";
import SignIn from "./pages/signIn.tsx";
import Products from "./pages/products.tsx";
import NotFoundPage from "./pages/404.tsx";
import Orders from "./pages/order.tsx";
// import { toast } from "sonner";
// import { AuthStore } from "./store/auth.store.ts";
// import $axios from "./http/index.ts";

const App = () => {
  const AppRoutes = () => {
    return useRoutes([
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            element: <Home />,
            index: true,
          },
          { path: "/signup", element: <SignUp /> },
          { path: "signin", element: <SignIn  /> },
          { 
            path: "contact",
            element: <Contact />,
          },
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "*",
            element: <NotFoundPage />,
          }
        ],
      },
    ]);
  };
  return <AppRoutes />;
};


export default App;