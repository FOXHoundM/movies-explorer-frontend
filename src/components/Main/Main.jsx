import React from 'react';
import MainHeader from '../Header/MainHeader/MainHeader';
import './Main.css';
import Header from '../Header/Header';
import MoviesHeader from './../Header/MoviesHeader/MoviesHeader';
import Promo from './Promo/Promo';
import NavTab from "./NavTab/NavTab";
import Techs from "./Techs/Techs";
import AboutProject from "./AboutProject/AboutProject";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import Footer from "../Footer/Footer";

const Main = ({loggedIn}) => {
	return (
		<>
			{loggedIn ? (
				<Header
					color={'header__color_grey'}
					location={'header__container_movies'}
				>
					<MoviesHeader/>
				</Header>
			) : (
				<Header
					color={'header__color_grey'}
					location={'header__container_landing'}
				>
					<MainHeader/>
				</Header>
			)}

			<main className='main'>
				<Promo/>
				<NavTab/>
				<AboutProject/>
				<Techs/>
				<AboutMe/>
				<Portfolio/>
			</main>
			<Footer/>
		</>
	);
};

export default Main;
