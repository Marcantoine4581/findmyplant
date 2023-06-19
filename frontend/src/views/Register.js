import NavBar from '../components/NavBar';
import React, { useState } from 'react';
import '../styles/Register.css';
import { useNavigate } from "react-router";
import axios from 'axios';

export default function Signup() {
  /* const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUsername] = useState(''); */
  const navigate = useNavigate();
  const [data, setData] = useState({
    userName: '',
    email: '',
    password: '',
    adress: {
      street: '',
      city: '',
      postalCode: '',
      country: ''
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/auth/signup', data)
      .then(res => {
        console.log(res)
        navigate('/')
      })
      .catch(error => console.log(error))
  };

  return(
    <div>
      <NavBar />
      <div className="register-wrapper">
        <p className='title'>Rejoins les passionnés de plantes sur FindMyPlant</p>
        <h1 className='title'>Créer un compte</h1>
        <form onSubmit={handleSubmit}>
            <label>
                <p>Nom de l'utilisateur</p>
                <input type="text" value={data.userName} onChange={e => setData({...data, userName: e.target.value})} />
            </label>
          <label>
            <p>Email</p>
            <input type="text" value={data.email} onChange={e => setData({...data, email: e.target.value})} />
          </label>
          <label>
            <p>Password</p>
            <input type="password" value={data.password} onChange={e => setData({...data, password: e.target.value})} />
          </label>
          <div className='button'>
            <button type="submit">Continuer</button>
          </div>
        </form>
      </div>
    </div>
    
  )
}