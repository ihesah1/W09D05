import { Link } from "react-router-dom";

const Navbar = ({ user, setLoggedUser }) => {
  const logout = () => {
    setLoggedUser(null)
    window.open("http://localhost:5000/auth/logout", "_self");
  };
  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">
          Social Network
        </Link>
      </span>
      {user ? (
        <ul className="list">
          <li className="listItem">
            <img
              src={user?.photos && user.photos[0].value}
              
              alt=""
              className="avatar"
            />
          </li>
          <li className="listItem">{user.displayName || user.username}</li>
          <li className="listItem" onClick={logout}>
            Logout
          </li>
        </ul>
      ) : (
        <Link className="link" to="login">
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
