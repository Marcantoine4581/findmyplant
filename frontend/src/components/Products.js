import PlantItem from './PlantItem'
import '../styles/Products.css'
import { useEffect, useState } from 'react';

function Products() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Appel à l'API
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setData(data.product));
  }, []);

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
          userId={userId}
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