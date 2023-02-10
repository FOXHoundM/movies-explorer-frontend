import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from './Preloader/Preloader';
import Header from '../Header/Header';
import MoviesHeader from '../Header/MoviesHeader/MoviesHeader';
import React, {useState} from 'react';
import {movies} from '../../utils/constants';
import Footer from '../Footer/Footer';
import './Movies.css';

export default function Movies() {
	const [isPreloaderOpen, setIsPreloaderOpen] = useState(false);


	const handleSubmit = (evt) => {
		evt.preventDefault();
		setIsPreloaderOpen(true);
	}

	return (
		<>
			<Header
				color={'header__color_white'}
				location={'header__container_movies'}
			>
				<MoviesHeader/>
			</Header>
			<main className='movies'>
				<SearchForm onSubmit={handleSubmit}/>
				<MoviesCardList movies={movies} cardType='searchMovie'/>

				<button type='button' className='movies__button'>
					Еще
				</button>

				<Preloader isOpen={isPreloaderOpen}/>
			</main>

			<Footer/>
		</>
	);
}
