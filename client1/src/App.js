
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom"

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Write from "./pages/Write";
import Single from "./pages/Single";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./Styles.scss";



const Layout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/Write",
        element: <Write/>
      },
      {
        path: "/Post/:id",
        element: <Single/>
      }
    ]
  },
  {
    path: "/Register",
    element: <Register/>
  },
  {
    path: "/Login",
    element: <Login/>,
  },
]);


function App() {
  return (
    <div className="app">
      <div className="container">
      <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
