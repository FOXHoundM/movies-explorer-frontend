import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = ({ color, location, children }) => {
	return (
		<header className='header header__color_white'>
			<div className='header__container header__container_movies'>
				<Link to='/' className='header__logo'></Link>

				<nav className='header__nav'>
					<ul className='header__nav_list'>
						<li className='header__nav_item'>
							<Link to='/movies' className='header__nav_item_link'>
								Фильмы
							</Link>
						</li>
						<li className='header__nav_item'>
							<Link to='/saved-movies' className='header__nav_item_link'>
								Сохранённые фильмы
							</Link>
						</li>
					</ul>
					<Link
						to='/profile'
						className='header__nav_item_link header__nav_item_link-button'
					>
						Аккаунт
					</Link>
				</nav>

				<button className='header__nav_burger-button'></button>
			</div>
		</header>

		// <header className={`header ${color}`}>
		// 	<div className={`header__container ${location}`}>
		// 		<Link to='/' className='header__logo'></Link>
		//
		// 		{children}
		//
		//
		// 	</div>
		// </header>
	);
};

export default Header;
