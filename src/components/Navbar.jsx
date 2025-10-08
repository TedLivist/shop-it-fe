import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import RoleGuard from "./RoleGuard";
import { useCart } from "../contexts/cartContext";
// import '../stylings/Navbar.css'

const Navbar = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { getTotalItems } = useCart()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="navbar-wrapper">
      SHOP It
      <NavLink to="/" className="nav-link">Homepage</NavLink>
      <RoleGuard allowedRoles={'brand'}>
        <NavLink to="/brand-dashboard" className="nav-link">B Dashboard</NavLink>
      </RoleGuard>
      <RoleGuard allowedRoles={'customer'}>
        <NavLink to="/profile" className="nav-link">Profile</NavLink>
      </RoleGuard>
      <RoleGuard allowedRoles={['guest', 'customer']}>
        <div className="cart-icon">
          <button onClick={() => navigate('/cart')}>
            Cart ({getTotalItems() ? getTotalItems() : 0})
          </button>
        </div>
      </RoleGuard>

      {/* <NavLink to="/manageDeadline" className="nav-link">Deadline</NavLink> */}
      {/* <NavLink to="/withdrawal" className="nav-link">Withdrawal</NavLink> */}

      {!user && (
        <div>
          <button className="nav-link" onClick={() => navigate('/login')}>
            Login
          </button>
          <button className="nav-link" onClick={() => navigate('/signup')}>
            Signup
          </button>
        </div>
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