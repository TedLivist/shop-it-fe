import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { useRole } from "../hooks/useRole";

const Login = () => {
  const navigate = useNavigate()
  const { login, user } = useAuth()
  const { getUserRole } = useRole()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
        case 'super_admin':
          navigate('/admin')
          break;
        default:
          navigate('/')
      }
    }
  }, [getUserRole, user, navigate])

  const handleLogin = async (e) => {
    e.preventDefault()

    console.log('email', email)
    console.log('password', password)

    try {
      await login(email, password)
    } catch (e) {
      console.error('Auth error: ', e.response?.data?.errors)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <label> Email
        <input
          type="email" name="email" placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)} value={email}
        />
      </label>

      <label> Password
        <input
          type="password" name="password" placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)} value={password}
        />
      </label>

      <button type="submit">Login</button>
    </form>
  )
}
 
export default Login;