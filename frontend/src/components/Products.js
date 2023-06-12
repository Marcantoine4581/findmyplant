import PlantItem from './PlantItem'
import '../styles/Products.css'
import { useEffect, useState } from 'react';
import Search from './Search';

function Products() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Appel à l'API
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => {
        setData(data.product);
        setFilteredData(data.product);
      });
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearchButtonClick = () => {
    const filtered = data.filter(item =>
      item.plantName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };


  return (
    <div>
      <Search
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        handleSearchButtonClick={handleSearchButtonClick}
      />

      <article className='fmp-plant-list'>
        {filteredData.map(({ _id, userId, imageUrl, plantName, price, condition }) => (
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
    </div>
  );
}

export default Products;