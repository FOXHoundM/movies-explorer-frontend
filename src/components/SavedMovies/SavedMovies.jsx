import React from 'react';
import './SavedMovies.css'
import Header from "../Header/Header";
import MoviesHeader from "../Header/MoviesHeader/MoviesHeader";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from "../Movies/Preloader/Preloader";

const SavedMovies = ({
											 movies,
											 onSubmit,
											 searchKeyword,
											 onCheckbox,
											 checked,
											 checkedSaveMovies,
											 allSavedMovies,
											 savedMovies,
											 onSave,
											 onDelete,
											 isFailed,
											 isNotFound,
											 isLoading
										 }) => {
	return (
		<>

			<Header
				color={'header__color_white'}
				location={'header__container_movies'}
			>
				<MoviesHeader/>
			</Header>


			<main className='saved-movies'>
				<SearchForm
					onSubmit={onSubmit}
					searchKeyword={searchKeyword}
					onCheckbox={onCheckbox}
					checked={checked}
					checkedSaveMovies={checkedSaveMovies}
				/>
				{isLoading ? (
					<Preloader/>
				) : (
					<MoviesCardList
						checked={checked}
						checkedSaveMovies={checkedSaveMovies}
						movies={movies}
						isNotFound={isNotFound}
						isFailed={isFailed}
						savedMovies={savedMovies}
						onSave={onSave}
						onDelete={onDelete}
						allSavedMovies={allSavedMovies}
					></MoviesCardList>
				)}

			</main>

			<Footer/>

		</>


	);
};

export default SavedMovies;
