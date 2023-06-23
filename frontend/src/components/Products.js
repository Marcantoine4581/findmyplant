import PlantItem from './PlantItem'
import '../styles/Products.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import PlantData from '../noms.json';

function Products() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [filteredData, setFilteredData] = useState([]);


  useEffect(() => {
    // Appel à l'API
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => {
        const dataStatusTrue = data.product.filter(item => item.status === true);
        setData(dataStatusTrue);
        setFilteredData(dataStatusTrue);
      });
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearchCity = event => {
    setSearchCity(event.target.value);
  };

  const handleSearchButtonClick = () => {
    const filtered = data.filter(item => {
      if (searchTerm && searchCity) {
        return (
          item.plantName.toLowerCase().includes(searchTerm.toLowerCase()) &&
          item.userId.adress.city.toLowerCase().includes(searchCity.toLowerCase())
        );
      } else if (searchTerm) {
        return item.plantName.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (searchCity) {
        return item.userId.adress.city.toLowerCase().includes(searchCity.toLowerCase());
      }
      return true; // if no criteria specified, return all elements.
    });
  
    setFilteredData(filtered);
  };


  return (
    <div>
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        searchCity={searchCity}
        handleSearchCity={handleSearchCity}
        handleSearchButtonClick={handleSearchButtonClick}
        plantData={PlantData}
      />

      <article className='fmp-plant-list'>
        {filteredData.map(({ _id, userId, imageUrl, plantName, price, condition }) => (
          <Link to={`/product/${_id}`} key={_id}>
            <PlantItem
              _id={_id}
              userName={userId.userName}
              imageUrl={imageUrl}
              plantName={plantName}
              price={price}
              condition={condition}
              city={userId.adress.city}
              postalCode={userId.adress.postalCode}
            />
          </Link>
        ))}
      </article>
    </div>
  );
}

export default Products;