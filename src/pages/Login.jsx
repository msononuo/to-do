import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../components/UserContext";

function Login() {
  const [user, setuser] = useState({
    username: "",
    password: "",
  });
  const { setToken } = useContext(UserContext);
  const navigate = useNavigate();
  
  const handlchange = (e) => {
    const { name, value } = e.target;
    setuser({ ...user, [name]: value });
  };
  const { username, password } = user;

  const submitting = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://dummyjson.com/user/login", {
        username,
        password,
      });
      console.log(data);
      setToken(data.accessToken);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={submitting}>
      <input
        placeholder="username"
        className="form-control"
        name="username"
        type="text"
        value={username}
        onChange={handlchange}
      />
      <input
        placeholder="password"
        className="form-control"
        name="password"
        type="password"
        value={password}
        onChange={handlchange}
      />
      <button className="btn btn-success">Login</button>
    </form>
  );
}

export default Login;
