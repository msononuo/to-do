import { NavLink, useNavigate } from "react-router-dom";
import useUser from "./useUser.js";

function Navbar() {
  const navigate = useNavigate();
  const { token, setToken } = useUser();

  const logout = () => {
    setToken(null);
    navigate("/");
  };

  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink
          to="/"
          className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition"
        >
          TO-DO
        </NavLink>

        <ul className="flex items-center gap-6 text-lg">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-semibold"
                  : "hover:text-blue-300 transition"
              }
            >
              Home
            </NavLink>
          </li>

          {token ? (
            <>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-semibold"
                      : "hover:text-blue-300 transition"
                  }
                >
                  Dashboard
                </NavLink>
              </li>

              <li>
                <button
                  type="button"
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLink
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
