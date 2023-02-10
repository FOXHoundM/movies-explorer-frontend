import React from 'react';
import './Header.css';
import {Link} from "react-router-dom";

const Header = ({color, children, location}) => {
	return (
		<header className={`header ${color}`}>
			<div className={`header__container ${location}`}>
				<Link to='/' className='header__logo'></Link>
				{children}
			</div>
		</header>
	);
};

export default Header;
