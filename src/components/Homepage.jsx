import { useEffect } from "react";
import { useAuth } from "../contexts/authContext";

const Homepage = () => {
  const { user } = useAuth()

  useEffect(() => {
    
  })

  return (
    <div>
      {user && (
        <div>Logged in</div>
      )}

      {!user && (
        <div>Logged out</div>
      )}
      I am the dashboard
      


    </div>
  );
}
 
export default Homepage;