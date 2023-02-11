import React from 'react';
import { Link } from 'react-router-dom';
import './MainHeader.css';

const MainHeader = () => {
	return (
		<nav className='header__link_container'>
			<ul className='header__link_list'>
				<li className='header__link_item'>
					<Link to='/signup' className='header__link_signup'>
						Регистрация
					</Link>
				</li>
				<li className='header__link_item'>
					<Link to='/signin' className='header__link_signin'>
						Войти
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default MainHeader;
