import Banner from '../components/Banner';
import React, { useState } from 'react';
import '../styles/Register.css';
import { useNavigate } from "react-router";
import axios from 'axios';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/auth/signup', {userName, email, password})
      .then(res => {
        console.log(res)
        navigate('/')
      })
      .catch(error => console.log(error))
  };

  return(
    <div>
      <Banner />
      <div className="register-wrapper">
        <p className='title'>Rejoins les passionnés de plantes sur FindMyPlant</p>
        <h1 className='title'>Créer un compte</h1>
        <form onSubmit={handleSubmit}>
            <label>
                <p>Nom de l'utilisateur</p>
                <input type="text" onChange={e => setUsername(e.target.value)} />
            </label>
          <label>
            <p>Email</p>
            <input type="text" onChange={e => setEmail(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)} />
          </label>
          <div className='button'>
            <button type="submit">Continuer</button>
          </div>
        </form>
      </div>
    </div>
    
  )
}