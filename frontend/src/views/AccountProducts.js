import '../styles/AccountProducts.css'
import Banner from '../components/Banner'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import moment from 'moment';

function AccountProducts() {
  const [data, setData] = useState([]);
  //const [updatedData, setUpdatedData] = useState([]);
  const uid = localStorage.getItem('userId');

  useEffect(() => {
    // Appel à l'API
    fetch(`http://localhost:5000/api/user/${uid}/products`)
      .then(response => response.json())
      .then(data => {
        console.log(data.products);
        setData(data.products);
      });
  }, [uid]);

  const handleDeleteProduct = (productId) => {
    axios.delete(`http://localhost:5000/api/products/${productId}`)
      .then((response) => {
        console.log(response);
        const updatedData = data.filter((product) => product._id !== productId);
        setData(updatedData);
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression du produit :', error);
      });
  };

  const handleSwitchToggle = (productId) => {
    const updatedProduct = data.find((product) => product._id === productId);
    console.log('updatedProduct = ', updatedProduct);
    const updatedAvailability = !updatedProduct.status;
    console.log('updatedAvailability = ', updatedAvailability);

    axios.put(`http://localhost:5000/api/products/${productId}`, { status: updatedAvailability })
      .then((response) => {
        console.log(response);
        const updatedData = data.map((product) => {
          if (product._id === productId) {
            return { ...product, status: updatedAvailability };
          }
          return product;
        });
        setData(updatedData);
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour de la disponibilité du produit :', error);
      });
  };


  return (
    <div>
      <Banner />
      <div className='accountProducts-wrapper'>
        <h1 className='accountTitle'>Mes annonces</h1>
        <article className='accountProducts'>
          {data.map(({ _id, imageUrl, plantName, price, condition, status, createAt }, index) => (
            <div className='accountProducts-details' key={`${_id}-${index}`}>
              <div className='plant-cover' style={{ backgroundImage: `url(${imageUrl})` }}></div>
              <div className='accountProducts-details-text'>
                <p>{plantName}</p>
                {!price ? <p>{condition}</p> : <p>Prix : {price} €</p>}
                <p>Date de création : {moment(createAt).format('DD-MM-YYYY')}</p>
              </div>
              <div className='accountProducts-button'>
                <button className='modify'>
                 <Link to={`/user/${uid}/modify-ad/${_id}`} key={_id}>
                    Modifier
                 </Link>
                </button>
                <button className='delete' onClick={() => handleDeleteProduct(_id)}>Supprimer</button>
              </div>
              <Form>
                <Form.Check
                  type="switch"
                  checked={status}
                  id={_id}
                  label="Disponibilité"
                  onChange={() => handleSwitchToggle(_id)}
                />
              </Form>
            </div>
          ))}
        </article>
      </div>
    </div>
  );
}

export default AccountProducts;