import React from 'react';
import './SavedMovies.css'
import Header from "../Header/Header";
import MoviesHeader from "../Header/MoviesHeader/MoviesHeader";
import SearchForm from "../Movies/SearchForm/SearchForm";

const SavedMovies = () => {
	return (
		<>
			<Header color={'header__color_white'}>
				<MoviesHeader/>
			</Header>


			<main className='saved-movies'>
				<SearchForm/>

			</main>

		</>


	);
};

export default SavedMovies;
