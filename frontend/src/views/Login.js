import React, { useState } from 'react';
import '../styles/Login.css';
import { useNavigate } from "react-router";
import axios from 'axios';

import { accountService } from '../services/accountService';

/* async function loginUser(credentials) {
 return fetch('http://localhost:5000/api/auth/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
} */

export default function Login() {
  const [email, setEmail] = useState('motai@gmail.com');
  const [password, setPassword] = useState('123');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password)
    axios.post('http://localhost:5000/api/auth/login', {email, password})
      .then(res => {
        console.log(res)
        accountService.saveToken(res.data.token)
        accountService.saveUserId(res.data.userId)
        accountService.saveUserName(res.data.userName)
        navigate('/')
      })
      .catch(error => console.log(error))
  };

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}