import { useRole } from "../hooks/useRole";

const RoleGuard = ({ children, allowedRoles, fallback = null }) => {
  const { isRole } = useRole();
  
  return isRole(allowedRoles) ? children : fallback;
};

export default RoleGuard;