import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import './BurgerMenu.css';

const BurgerMenu = ({isOpen, onClose}) => {
	return (
		<div className={`burger__menu ${isOpen && 'open'}`}>
			<div className='burger__menu_container '>
				<button
					className='burger__menu_close'
					onClick={onClose}
					type='button'
				/>
				<nav className='burger__menu_nav'>
					<Link to='/' className='burger__menu_nav-link'>
						Главная
					</Link>
					<NavLink to='/movies' className='burger__menu_nav-link'>
						Фильмы
					</NavLink>
					<NavLink to='/saved-movies' className='burger__menu_nav-link'>
						Сохраненные фильмы
					</NavLink>
				</nav>

				<Link to='/profile' className='burger__menu_link_profile'>
					Аккаунт
				</Link>
			</div>
		</div>
	);
};

export default BurgerMenu;
