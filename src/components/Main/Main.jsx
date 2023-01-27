import React from 'react';
import MainHeader from "../Header/MainHeader/MainHeader";

import './Main.css'
import Header from "../Header/Header";


const Main = () => {
	return (
		<>
			<Header
				color={'header__color_white'}
				location={'header__container_movies'}
			>
				<MainHeader/>
			</Header>


			<Header
				color={'header__color_grey'}
				location={'header__container_landing'}
			>
				<MainHeader/>
			</Header>

			<main>


			</main>
		</>
	)
		;
};

export default Main;
