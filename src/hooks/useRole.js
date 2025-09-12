import { useAuth } from "../contexts/AuthContext"

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

  const canAccessOrderItem = (orderItem) => {
    if (!user || !orderItem) return false;

    if (orderItem.product.brand_id === user.brand_id) {
      return true;
    }

    if (orderItem.order.customer_id === user.customer_id) {
      return true;
    }

    // if (user.super_admin_id) {
    //   return true;
    // }

    return false;
  }

  return { hasRole, isRole, getUserRole, userRole: getUserRole(), canAccessOrderItem }  
}