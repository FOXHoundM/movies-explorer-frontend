import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './MoviesHeader.css';
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const MoviesHeader = () => {
	const [isBurgerOpen, setIsBurgerOpen] = useState('');
	const handleBurgerOpenClick = () => setIsBurgerOpen('open');
	const handleBurgerCloseClick = () => setIsBurgerOpen('');

	return (
		<>
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
