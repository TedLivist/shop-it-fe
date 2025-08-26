import { useState } from "react";
import { useAuth } from "../contexts/authContext";

const Login = () => {
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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