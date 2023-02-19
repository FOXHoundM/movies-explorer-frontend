import React from 'react';
import Header from '../Header/Header';
import MoviesHeader from '../Header/MoviesHeader/MoviesHeader';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from './Preloader/Preloader';
import SearchForm from './SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import './Movies.css';

export default function Movies({
	movies,
	checked,
	onCheckbox,
	checkedSaveMovies,
	isNotFound,
	isFailed,
	savedMovies,
	onSave,
	onDelete,
	onSubmit,
	searchKeyword,
	allSavedMovies,
	isLoading
}) {
	return (
		<>
			<Header
				color={'header__color_white'}
				location={'header__container_movies'}
			>
				<MoviesHeader />
			</Header>
			<main className='movies'>
				<SearchForm
					onSubmit={onSubmit}
					searchKeyword={searchKeyword}
					onCheckbox={onCheckbox}
					checked={checked}
					checkedSaveMovies={checkedSaveMovies}
				/>

				{isLoading ? (
					<Preloader />
				) : (
					<MoviesCardList
						movies={movies}
						isNotFound={isNotFound}
						isFailed={isFailed}
						searchKeyword={searchKeyword}
						savedMovies={savedMovies}
						onSave={onSave}
						onDelete={onDelete}
						onCheckbox={onCheckbox}
						checked={checked}
						checkedSaveMovies={checkedSaveMovies}
						allSavedMovies={allSavedMovies}
					/>
				)}
			</main>

			<Footer />
		</>
	);
}
