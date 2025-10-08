import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate()
  const { signup } = useAuth()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [userRole, setUserRole] = useState('')

  const handleSignup = async (e) => {
    e.preventDefault()

    try {
      await signup(firstName, lastName, email, password, passwordConfirmation, userRole)
      if (userRole == 'customer') {
        localStorage.setItem('new_customer_email', email)
        navigate('/verifyOtp')
      } else if (userRole == 'brand') {
        alert('Wait for admin to verify your account')
        navigate('/')
      }
    } catch (e) {
      console.error('Auth error: ', e.response?.data?.errors)
    }
  }

  return (
    <div>
      <form onSubmit={handleSignup}>
        <input type="text" name="firstName"
          placeholder="Enter first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <input type="text" name="lastName"
          placeholder="Enter last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <input type="email" name="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input type="password" name="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input type="password" name="passwordConfirmation"
          placeholder="Enter password confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />

        <select name="userRole" onChange={(e) => setUserRole(e.target.value)} required>
          <option disabled selected value>--user role--</option>
          <option value="customer">Customer</option>
          <option value="brand">Brand</option>
        </select>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
 
export default Signup;