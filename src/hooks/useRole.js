import { useAuth } from "../contexts/authContext"

export const useRole = () => {
  const { user } = useAuth()

  const getUserRole = () => {
    if (!user) return 'guest';
    if (user.super_admin_id) return 'super_admin';
    if (user.brand_id) return 'brand';
    if (user.customer_id) return 'customer';
    return 'guest';
  };

  const hasRole = (role) => {
    return getUserRole() === role;
  };

  const isRole = (roles) => {
    const userRole = getUserRole();
    return Array.isArray(roles) ? roles.includes(userRole) : roles === userRole;
  };

  return { hasRole, isRole, getUserRole, userRole: getUserRole() }  
}