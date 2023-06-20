import NavBar from '../components/NavBar';
import React, { useState } from 'react';
import '../styles/Register.css';
import '../styles/ErrorMessage.css';
import { useNavigate } from "react-router";
import axios from 'axios';

export default function Signup() {
  /* const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUsername] = useState(''); */
  const [password2, setPassword2] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
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

    if (data.password === password2) {
      axios.post('http://localhost:5000/api/auth/signup', data)
      .then(res => {
        console.log(res)
        
        navigate('/')
      })
      .catch(error => {
        console.log(error);
        setEmailError(error.response.data.message)
      })
    } else {
      setPasswordError("Les mots de passe ne correspondent pas");
    }

    
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
            {emailError && <p className='errorMessage'>{emailError}</p>}
          <label>
            <p>Mot de passe</p>
            <input type="password" value={data.password} onChange={e => setData({...data, password: e.target.value})} />
          </label>
          {passwordError && <p className='errorMessage'>{passwordError}</p>}
          <label>
            <p>Confirmation du mot de passe</p>
            <input type="password" value={password2} onChange={e => setPassword2(e.target.value)} />
          </label>
          {passwordError && <p className='errorMessage'>{passwordError}</p>}
          <div className='button'>
            <button type="submit">Continuer</button>
          </div>
        </form>
      </div>
    </div>
    
  )
}