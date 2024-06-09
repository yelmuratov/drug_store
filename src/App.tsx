import Auth from "./pages/auth.tsx";
import Layout from "./layout/rootlayout.tsx";
import SignUp from "./pages/signUp.tsx";
import { useRoutes } from "react-router-dom";
import Home from "./pages/home.tsx";
import Contact from "./pages/contact.tsx";
import SignIn from "./pages/signIn.tsx";
import Products from "./pages/products.tsx";

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
          { path: "/auth", element: <Auth /> },
          { path: "/signup", element: <SignUp /> },
          { path: "signin", element: <SignIn  /> },
          {
            path: "contact",
            element: <Contact />,
          },
          {
            path: "products",
            element: <Products />,
          }
        ],
      },
    ]);
  };
  return <AppRoutes />;
};

export default App;
