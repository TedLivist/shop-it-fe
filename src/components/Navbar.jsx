import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
// import '../stylings/Navbar.css'

const Navbar = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="navbar-wrapper">
      SHOP It
      <NavLink to="/" className="nav-link">Dashboard</NavLink>
      {/* <NavLink to="/manageDeadline" className="nav-link">Deadline</NavLink> */}
      {/* <NavLink to="/withdrawal" className="nav-link">Withdrawal</NavLink> */}

      {!user && (
        <button className="nav-link" onClick={() => navigate('/login')}>
          Login
        </button>
      )}
      {user && (
        <button className="nav-link" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
}
 
export default Navbar;