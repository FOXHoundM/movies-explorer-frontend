import React from 'react';
import './SavedMovies.css'
import Header from "../Header/Header";
import MoviesHeader from "../Header/MoviesHeader/MoviesHeader";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import {movies} from '../../utils/constants';
import Footer from '../Footer/Footer';

const SavedMovies = () => {
	return (
		<>

			<Header
				color={'header__color_white'}
				location={'header__container_movies'}
			>
				<MoviesHeader/>
			</Header>


			<main className='saved-movies'>
				<SearchForm/>
				<MoviesCardList movies={movies} cardType='searchMovie'/>

			</main>

			<Footer/>

		</>


	);
};

export default SavedMovies;
