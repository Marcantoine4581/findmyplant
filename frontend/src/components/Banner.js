import '../styles/Banner.css'
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom'

function Banner() {
	const title = 'FindMyPlant'
	return (
		<div className='fmp-banner'>
			<h1 className='fmp-title'>
				<Link to="/" className="link-style">
					{title}
				</Link>
			</h1>
			<div>
				<button className='button-ad'>
					<Link to="/createad" className="link-style">
						Déposer une annonce
					</Link>
				</button>
				<button className='button-login'>
					<Link to="/login" className="link-style">
						Se connecter
					</Link>
				</button>
			</div>
		</div>
	);
}

export default Banner