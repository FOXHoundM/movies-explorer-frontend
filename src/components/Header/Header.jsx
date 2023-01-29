import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import BurgerMenu from './BurgerMenu/BurgerMenu';

const Header = ({ color, location, children, }) => {
	const [isBurgerOpen, setIsBurgerOpen] = useState('');
	const handleBurgerOpenClick = () => setIsBurgerOpen('.open');
	const handleBurgerCloseClick = () => setIsBurgerOpen('');

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

				{/*<div className={`burger__menu ${isOpen && 'open'}`}>
			<div className='burger__menu_container'>
				<button
					className='burger__menu_close'
					onClick={onClose}
					type='button'
				/>
				<nav className='burger__menu_nav'>
					<Link to='/' className='burger__menu_nav-link'>Главная</Link>
					<Link to='/movies' className='burger__menu_nav-link'>Фильмы</Link>
					<Link to='/saved-movies' className='burger__menu_nav-link'>Сохраненные фильмы</Link>
				</nav>

				<Link to='/profile' className='burger__menu_link_profile'>Аккаунт</Link>
			</div>
		</div>*/}

				<button
					className='header__nav_burger-button'
					onClick={handleBurgerOpenClick}
				></button>

				<BurgerMenu isOpen={isBurgerOpen} onClose={handleBurgerCloseClick}></BurgerMenu>



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
