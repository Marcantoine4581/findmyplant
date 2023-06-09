import '../styles/Search.css'

function Search() {
	return (
		<div className='fmp-search'>
			<label className='fmp-search-input'>
				<input type="text"/>
			</label>
			<label>
				<input type="text"/>
			</label>
			<button className='button-search'>
				Rechercher
			</button>
		</div>
	);
}

export default Search