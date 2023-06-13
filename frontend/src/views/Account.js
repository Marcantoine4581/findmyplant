import Banner from '../components/Banner'
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Account.css'

export default function Account() {
    const uid = localStorage.getItem('userId');
    const [message, setMessage] = useState('');
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
   
    useEffect(() => {
        axios.get('http://localhost:5000/api/user/' + uid)
            .then(res => {
                console.log(res.data.user)
                setData(res.data.user)
                
            })
            .catch(error => console.log(error))
    }, []);

    function onSubmit(e) {
        e.preventDefault()
        axios.put('http://localhost:5000/api/user/' + uid, data)
            .then(res => {
                console.log(res.data)
                console.log('Mise à jour réussie !');
                setMessage(res.data.message);
            })
            .catch(error => console.log(error))
    }

  return(
    <div>
        <Banner />
        <div className="account-wrapper">
            <h1 className='title'>Mes informations</h1>
            <form className='account-form' onSubmit={onSubmit}>
                <label className='label-input'>
                    Nom de l'utilisateur :
                    <input 
                        type="text"
                        value={data.userName}
                        onChange={e => setData({...data, userName: e.target.value })}
                    />
                </label>
                <label>
                    Email : 
                    <input type="text" value={data.email} onChange={e => setData({...data, email: e.target.value })} />
                </label>
                <label>
                    Mot de passe :
                    <input type="password" value={data.password} onChange={e => setData({...data, password: e.target.value })} />
                </label>
                <p>Adresse: </p>
                <label>
                    Rue :
                    <input type="text" value={data.adress.street} onChange={e => setData({ ...data, adress: { ...data.adress, street: e.target.value } })} />
                </label>
                <label>
                    Ville :
                    <input type="text" value={data.adress.city} onChange={e => setData({ ...data, adress: { ...data.adress, city: e.target.value } })} />
                </label>
                <label>
                    Code postale :
                    <input type="text" value={data.adress.postalCode} onChange={e => setData({ ...data, adress: { ...data.adress, postalCode: e.target.value } })} />
                </label>
                <label>
                    Pays :
                    <input type="text" value={data.adress.country} onChange={e => setData({ ...data, adress: { ...data.adress, country: e.target.value } })} />
                </label>
                <div className='account-button'>
                    <button type="submit">Mettre à jour</button>
                </div>
            </form>
            {message && <p>{message}</p>} 
        </div>
    </div>
    
  )
}