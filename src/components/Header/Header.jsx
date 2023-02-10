import React from 'react';
import './Header.css';

const Header = ({color, children}) => {
	return (
		<header className={`header ${color}`}>

			<div className={'header__container'}>
				<a href='/' className='header__logo'></a>
				{children}
			</div>

		</header>


	);
};

export default Header;
