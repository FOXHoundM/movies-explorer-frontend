import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

const MoviesCard = ({
	name,
	duration,
	thumbnail,
	trailerLink,
	savedMovies,
	onSave,
	onDelete,
	movie,
	allSavedMovies,
}) => {
	const location = useLocation();
	const hours = Math.floor(duration / 60);
	const minutes = Math.floor(duration - hours * 60);
	const isSaved = savedMovies.some((m) => m.movieId === movie.id);
	const isAllSaved = allSavedMovies.some((m) => m.movieId === movie.id);

	const saveButtonClassName =
		isSaved || isAllSaved
			? 'movies-card__favorite movies-card__favorite_active'
			: 'movies-card__favorite movies-card__favorite_inactive';

	const handleSaveClick = () => {
		if (isSaved) {
			allSavedMovies.some((m) => m.movieId === movie.id);
		} else {
			onSave(movie);
		}
	};

	const handleDeleteMovie = () => onDelete(movie);

	return (
		<li className='movies-card__item'>
			<a
				href={trailerLink}
				target='_blank'
				className='movies-card__trailer-link'
				rel='noreferrer'
			>
				<img src={thumbnail} alt='фото фильма' className='movies-card__image' />
			</a>
			<div className='movies-card__block'>
				<h3 className='movies-card__title'>{name}</h3>

				{location.pathname === '/movies' && (
					<button
						type='button'
						className={saveButtonClassName}
						onClick={handleSaveClick}
					></button>
				)}
				{location.pathname === '/saved-movies' && (
					<button
						type='button'
						className=' movies-card__favorite movies-card__favorite_delete'
						onClick={handleDeleteMovie}
					></button>
				)}
			</div>
			<div className='movies-card__time'>
				{hours}ч{minutes}м
			</div>
		</li>
	);
};

export default MoviesCard;
