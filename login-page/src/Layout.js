import { Outlet, Link } from "react-router-dom";
import Login from "./screens/login";

const Layout = () => {
  return (
    <>
      
    {
    <Link to="/login" element={<Login />}>Login</Link>
    /* <nav>
        <ul>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>

        </ul>
      </nav> */}

      <Outlet />
    </>
  )
};

export default Layout;