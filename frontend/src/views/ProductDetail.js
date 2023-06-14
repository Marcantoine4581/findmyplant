import Banner from '../components/Banner'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ProductDetail.css'

export default function ProductDetail() {
  const { id } = useParams()
  const [data, setData] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/products/' + id)
      .then(res => {
        console.log(res.data.product)
        setData(res.data.product)
      })
      .catch(error => console.log(error))
  }, [id]);

  if (!data) {
    return null; // Return a loading state or placeholder while data is being fetched
  }

  return (
    <div >
      <Banner />
      <div className='plant-detail-wrapper'>
        <div>
          <div className='plant-detail-cover' style={{ backgroundImage: `url(${data.imageUrl})` }}></div>
          <div className='plant-detail-name-condition'>
            {data.plantName}
            {data.condition}
          </div>
          <div>
            {data.price ? (
              <span>{data.price} €</span>
            ) : null}
          </div>
          <p>Description</p>
          <p>{data.comment}</p>
        </div>
        <div className='plant-detail-contact'>
          {data.userId.userName}
          <button>Contacter</button>
          {data.userId.email}
        </div>
      </div>
    </div>
  )
}