import NavBar from '../components/NavBar'
import React, { useState } from 'react';
import '../styles/Login.css';
import '../styles/ErrorMessage.css';
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
  const apiUrl = process.env.REACT_APP_API_URL;
  const endpointauth = process.env.REACT_APP_END_POINT_AUTH;
  const [email, setEmail] = useState('motai@gmail.com');
  const [password, setPassword] = useState('123');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const setAuthToken = (token) => {
    if (token) {
      // Appliquer le token à l'en-tête de chaque requête
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      // Supprimer l'en-tête Authorization si le token est vide
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password)
    
      axios.post(`${apiUrl}${endpointauth}login`, {email, password})
      .then(res => {
        accountService.saveToken(res.data.token)
        accountService.saveUserId(res.data.userId)
        setAuthToken(res.data.token);
        navigate('/')
      })
      .catch(error => {
        console.log(error)
        setMessage(error.response.data.message)
      })
  };

  return(
    <div>
      <NavBar />
      <div className="login-wrapper">
        <p className='title'>Bienvenue sur FindMyPlant</p>
        <h1 className='title'>Se connecter</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Email</p>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          {message && <p className='errorMessage'>{message}</p>}
          <div className='login-button'>
            <button type="submit">Se connecter</button>
          </div>
        </form>
      </div>
    </div>
    
  )
}