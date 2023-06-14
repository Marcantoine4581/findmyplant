import '../styles/Banner.css'
//import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom'
import { accountService } from "../services/accountService";

function Banner() {
	const title = 'FindMyPlant'
	let navigate = useNavigate()
	const logout = () => {
		accountService.logout()
		navigate('/')
	}
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
				{(!accountService.isLogged() && (
					<>
						<button className='button-white'>
							<Link to="/login" className="link-style">
								Se connecter
							</Link>
						</button>
						<button className='button-white'>
							<Link to="/signup" className="link-style">
								S'enregitrer
							</Link>
						</button>
					</>
				)) || (
					<>
						<button className='button-white'>
							<Link to="/account" className="link-style">
								Mon compte
							</Link>
						</button>
						<button className='button-white'>
							<Link to="/account-annonces" className="link-style">
								Mes annonces
							</Link>
						</button>
						<button className='button-logout' onClick={logout}>
							Déconnection
						</button>	
					</>
				)}
			</div>
		</div>
	);
}

export default Banner