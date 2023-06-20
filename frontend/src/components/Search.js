import React from 'react';
import '../styles/Search.css'

function Search({ searchTerm, handleSearch, searchCity, handleSearchCity, handleSearchButtonClick }) {
	return (
		<div className='fmp-search'>
			<div className='search-box'>
				<label className='fmp-search-input'>
					<input 
						className='fmp-search-input-input' 
						type="text"
						value={searchTerm}
						placeholder="Rechercher une plante"
      					onChange={handleSearch}
					/>
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