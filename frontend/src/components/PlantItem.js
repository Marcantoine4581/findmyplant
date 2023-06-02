import '../styles/PlantItem.css'

function PlantItem({ _id, userId, imageUrl, plantName, price, condition }) {
	return (
		<div key={_id} className='fmp-plant-item'>
			{userId}
			<img className='fmp-plant-item-cover' src={imageUrl} alt={`${plantName} cover`} />
			{plantName}
			<div>
				{price}
			</div>
			<div className='fmp-condition'>
				{condition}
			</div>
		</div>
	)
}

export default PlantItem