import { Link } from "react-router-dom";
import useUser from "../components/useUser.js";

function Home() {
  const { user, token } = useUser();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-xl w-full">
        
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome to the TO-DO App 
        </h1>

        {token && user ? (
          <>
            <h3 className="mt-4 text-lg text-slate-600">
              Hi <span className="font-semibold text-blue-600">{user.username}</span>
            </h3>

            <Link
              to="/dashboard"
              className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
            >
              Go to Dashboard
            </Link>
          </>
        ) : (
          <>
            <p className="mt-4 text-slate-500">
              Organize your tasks</p>

            <Link
              to="/login"
              className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
            >
              Login to Start
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;