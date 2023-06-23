import React from 'react';
import '../styles/Search.css'
import { useState } from 'react';

function Search({ searchTerm, setSearchTerm, handleSearch, searchCity, handleSearchCity, handleSearchButtonClick, plantData }) {
	const uniquePlantData = Array.from(new Set(plantData.map(op => op.nom_francais)));
	const filteredOptions = uniquePlantData.filter(nom_francais =>
		nom_francais.toLowerCase().includes(searchTerm.toLowerCase())
	);
	const [selectedItem, setSelectedItem] = useState('');
	const [showResults, setShowResults] = useState(true);

	const handleDataItemClick = (nom) => {
		setSelectedItem(nom); // Mettre à jour l'état avec la valeur du dataItem sélectionné
		setShowResults(false);
	};

	const handleClearSelectedItem = () => {
		setSelectedItem('');
		setSearchTerm('');
		setShowResults(true);
	};
	return (
		<div className='fmp-search'>
			<div className='search-box'>
				<label className='fmp-search-input'>
					<input
						list="plant"
						className='fmp-search-input-input'
						type="text"
						value={selectedItem || searchTerm}
						placeholder="Rechercher une plante"
						onChange={handleSearch}
					/>
					{selectedItem && (
						<button className='clear-selection' onClick={handleClearSelectedItem}>
							X
						</button>
					)}
					{showResults && searchTerm.length >= 3 && (
						<div className='dataResult'>
							{filteredOptions.slice(0, 10).map((nom, index) => <p key={index} className='dataItem' onClick={() => handleDataItemClick(nom)}>{nom}</p>)}
						</div>
					)}
				</label>
				<label className='fmp-search-input'>
					<input
						className='fmp-search-input-input'
						type="text"
						value={searchCity}
						placeholder="Rechercher une ville"
						onChange={handleSearchCity}
					/>
				</label>
				<button className='button-search' onClick={handleSearchButtonClick}>
					Rechercher
				</button>
			</div>
		</div>
	);
}

export default Search