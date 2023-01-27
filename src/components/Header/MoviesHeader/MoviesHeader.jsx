import React from 'react';
import { Link } from 'react-router-dom';
import './MoviesHeader.css'


const MoviesHeader = () => {

  //const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState('');
  //const handleBurgerMenuOpenClick = () => setIsBurgerMenuOpen('open');
  //const handleBurgerMenuCloseClick = () => setIsBurgerMenuOpen('');


	return (
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

	);
};

export default MoviesHeader;
