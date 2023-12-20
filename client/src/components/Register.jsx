import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [err, setErr] = useState(null);

    const handleChange = (e) =>{
        setInputs(prev => ({...prev, [e.target.name] : e.target.value}))
    }

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            await axios.post("/auth/register", inputs)
            navigate("/")
        } catch(err){
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
        <h1 className='loginHeader'>Register</h1>
        <form>
            <input required type='text' placeholder='Enter username' name="username" onChange={handleChange} />
            <input required type='email' placeholder='Enter email' name='email' onChange={handleChange} />
            <div className='togglePassword'>
              <input required type='password' placeholder='Enter password' id='password' name='password' onChange={handleChange} />
              <i  className="fa-solid fa-eye" onClick={togglePassword}></i>
            </div>
            <button style={{right: "18px", borderRadius: "10px", width: "80px"}} onClick={handleSubmit}>Register</button>
            {err && <p>{err}</p>}
            <br />
            
            <span style={{fontSize: "16px"}}>Do you already have an Account? <Link to="/login">Login</Link></span>
        </form>
    </div>
  )
}

export default Register