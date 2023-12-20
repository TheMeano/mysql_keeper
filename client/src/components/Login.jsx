import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Login = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
      })
      const [err, setErr] = useState(null) 
    
      const handleChange = (e)=>{
        setInputs(prev =>({...prev, [e.target.name]: e.target.value}))
      }
    
      const navigate = useNavigate();
     
      const {login} = useContext(AuthContext);
    
      const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
          await login(inputs)
          await axios.post("/auth/login", inputs)
          navigate("/")
        }catch(err){
          setErr(err.response.data);
        }
      }

      function togglePassword() {
        var x = document.getElementById("password");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      }

  return (
    <div className='login'>
        <h1 className='loginHeader'>Login</h1>
        <form>
            <input required type='text' placeholder='Enter username' name='username' onChange={handleChange} />
            <div className='togglePassword'>
              <input required type='password' placeholder='Enter password' id='password' name='password' onChange={handleChange} />
              <i  className="fa-solid fa-eye" onClick={togglePassword}></i>
            </div>
            <button style={{right : "18px", borderRadius: "10px", width : "80px"}} onClick={handleSubmit}>Login</button>
            <br />
            {err && <p style={{color: "red"}}>{err}</p>}
            <span style={{fontSize: "16px"}}>Don't have an account? <Link  to="/register">Register</Link></span>
        </form>
    </div>
  )
} 

export default Login