import PlantItem from './PlantItem'
import '../styles/Products.css'
import { useEffect, useState } from 'react';
//import axios from 'axios';

function Products() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Appel à l'API
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setData(data.product));
  }, []);

 /*  useEffect(() => {
    // Appel à l'API des utilisateurs
    axios.get('http://localhost:5000/api/user')
      .then(response => console.log(response))
  }, []); */

  return (
 /*    <div>
        {data.map(item => (
        <div key={item._id}>
            <p>{item.userId}</p>
            <p>{item.plantName}</p>
            <p>{item.condition}</p>
            <p>{item.price}</p>
            <p>{item.comment}</p>
            <p>{item.createdAt}</p>
            <p>{item.status}</p>
            <img src={item.imageUrl} alt={item.plantName} />
        </div>
        ))}
    </div> */

    <article className='fmp-plant-list'>
      {data.map(({ _id, userId, imageUrl, plantName, price, condition }) => (
        <PlantItem
          _id={_id}
          userName={userId.userName}
          imageUrl={imageUrl}
          plantName={plantName}
          price={price}
          condition={condition}
        />
      ))}
    </article>
  );
}

export default Products;