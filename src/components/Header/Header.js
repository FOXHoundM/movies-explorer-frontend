import React from 'react';
import './Header.css';
import {Link} from "react-router-dom";

const Header = () => {
	return (
		<header className='header header__color'>

			<div className='header__container header__container_landing'>
				<Link to='/' className='header__logo'></Link>

			</div>

		</header>
	);
};

export default Header;
