import React from 'react';
import MainHeader from '../Header/MainHeader/MainHeader';
import './Main.css';
import Header from '../Header/Header';
import MoviesHeader from './../Header/MoviesHeader/MoviesHeader';
import Promo from './Promo/Promo';
import NavTab from "./NavTab/NavTab";
import Techs from "./Techs/Techs";
import AboutProject from "./AboutProject/AboutProject";

const Main = ({loggedIn}) => {
	return (
		<>
			{loggedIn ? (
				<Header color={'header__color_white'}>
					<MoviesHeader/>
				</Header>
			) : (
				<Header color={'header__color_grey'}>
					<MainHeader/>
				</Header>
			)}

			<main className='main'>
				<Promo/>
				<NavTab/>
				<AboutProject/>
				<Techs/>
			</main>
		</>
	);
};

export default Main;
