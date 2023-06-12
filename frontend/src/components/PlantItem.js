import '../styles/PlantItem.css'

function PlantItem({ _id, userName, imageUrl, plantName, price, condition, adress }) {
	return (
		<div key={_id} className='fmp-plant-item'>
			{userName}
			<div className='fmp-plant-item-cover-condition' style={{backgroundImage: `url(${imageUrl})`}}>
				{/* <img className='fmp-plant-item-cover' src={imageUrl} alt={`${plantName} cover`} /> */}
				<p className='fmp-condition'>{condition}</p>
			</div>
			{plantName}
			<div>
				<p>{price ? (
					<span>{price} €</span>
				) : null}</p>
			</div>
			{adress}
			
		</div>
	)
}

export default PlantItem