import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRole } from "../hooks/useRole";

const VerifyOTP = () => {
  const { verifyOtp, user } = useAuth()
  const navigate = useNavigate()
  const { getUserRole } = useRole()

  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')

  useEffect(() => {
    setEmail(localStorage.getItem('new_customer_email'))
  }, [])

  useEffect(() => {
      if(user) {
        const role = getUserRole()
  
        switch(role) {
          case 'brand':
            navigate('/brand-dashboard')
            break;
          case 'customer':
            navigate('/')
            break;
          default:
            navigate('/')
        }
      }
    }, [getUserRole, user, navigate])

  const handleOTP = async(e) => {
    e.preventDefault()

    try {
      await verifyOtp(email, otp)
      localStorage.removeItem('new_customer_email')
    } catch (e) {
      console.error('Auth error: ', e.response?.data?.errors)
    }
  }

  return (
    <div>
      <form onSubmit={handleOTP}>
        <input type="number" name="OTP"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
}
 
export default VerifyOTP;