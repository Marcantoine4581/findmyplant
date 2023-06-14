// import '../styles/Products.css'
import Banner from '../components/Banner'
import { useEffect, useState } from 'react';
//import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

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
      <h1>Mes annonces</h1>
      {data.map(({ _id, imageUrl, plantName, price, condition, status }, index) => (
        <div className='plant-details' key={`${_id}-${index}`}>
          <div className='plant-detail-cover' style={{ backgroundImage: `url(${imageUrl})` }}></div>
          <div>
            <p>{plantName}</p>
            <p>{price}</p>
            <p>{condition}</p>
            <p></p>
          </div>
          <div>
            <button>Modifier</button>
            <button>Supprimer</button>
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

    </div>
  );
}

export default AccountProducts;