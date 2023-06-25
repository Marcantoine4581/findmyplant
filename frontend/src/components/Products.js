import PlantItem from './PlantItem'
import '../styles/Products.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import PlantData from '../noms.json';
import Pagination from './Pagination';

function Products() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const endpoint = process.env.REACT_APP_END_POINT_PRODUCTS;
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // Nombre d'éléments par page


  useEffect(() => {
    // Appel à l'API
    fetch(`${apiUrl}${endpoint}`)
      .then(response => response.json())
      .then(data => {
        const dataStatusTrue = data.product.filter(item => item.status === true);
        setData(dataStatusTrue);
        setFilteredData(dataStatusTrue);
      });
  }, [apiUrl, endpoint]);

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

    // Calculer le nombre total de pages
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Fonction pour passer à la page suivante
    const nextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    // Fonction pour passer à la page précédente
    const prevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    // Fonction pour passer à une page spécifique
    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };
  
    // Calculer l'indice de début et de fin des éléments affichés sur la page actuelle
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    // Obtenir les éléments à afficher sur la page actuelle
    const itemsToDisplay = filteredData.slice(startIndex, endIndex);


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
        {itemsToDisplay.map(({ _id, userId, imageUrl, plantName, price, condition }) => (
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

      {/* Afficher la pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={nextPage}
        onPrevPage={prevPage}
        onGoToPage={goToPage}
      />
    </div>
  );
}

export default Products;