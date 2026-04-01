import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center fixed w-full z-10 top-0">
      <h1 className="text-2xl font-bold text-primary"><Link to="/" className="pl-4">Shop</Link></h1>

      <div className="flex gap-4 text-sm">
        {/* <Link to="/">Home</Link> */}

        {isAuthenticated ? (
          <>
            <Link to="/cart" className=" px-3 font-medium">
              Cart
            </Link>
            <Link to="/orders" className=" px-3 font-medium">
              Orders
            </Link>
            <button onClick={logout} className=" px-3 font-medium">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className=" font-medium">
              Login
            </Link>
            <span>|</span>
            <Link to="/register" className=" font-medium">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}