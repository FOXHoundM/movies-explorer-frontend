import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import './MoviesHeader.css';

const MoviesHeader = () => {
	const [isBurgerOpen, setIsBurgerOpen] = useState('');
	const handleBurgerOpenClick = () => setIsBurgerOpen('open');
	const handleBurgerCloseClick = () => setIsBurgerOpen('');

	return (
		<>
			<nav className='header__nav'>
				<ul className='header__nav_list'>
					<li className='header__nav_item'>
						<NavLink
							to='/movies'
							className='header__nav_item_link header__nav_item_link-color'
						>
							Фильмы
						</NavLink>
					</li>
					<li className='header__nav_item'>
						<NavLink
							to='/saved-movies'
							className='header__nav_item_link header__nav_item_link-color'
						>
							Сохранённые фильмы
						</NavLink>
					</li>
				</ul>
				<Link to='/profile' className='header__nav_item_link-button'>
					Аккаунт
				</Link>
				<button
					className='header__nav_burger-button'
					onClick={handleBurgerOpenClick}
				></button>
			</nav>
			<BurgerMenu
				isOpen={isBurgerOpen}
				onClose={handleBurgerCloseClick}
			></BurgerMenu>
		</>
	);
};

export default MoviesHeader;
