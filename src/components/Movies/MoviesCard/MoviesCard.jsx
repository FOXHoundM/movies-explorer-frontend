import React from 'react';
import './MoviesCard.css';
import {useState} from 'react';
import {useLocation} from 'react-router-dom';

const MoviesCard = ({trailerLink, imageLink, duration, nameRU}) => {
	const location = useLocation();
	const hours = Math.floor(duration / 60);
	const minutes = Math.floor(duration - hours * 60);
	const [isFavorite, setIsFavorite] = useState(false);

	const cardLikeButtonClassName = `movies-card__favorite ${
		isFavorite ? 'movies-card__favorite_active' : 'movies-card__favorite_inactive'
	}`;


	const handleFavoriteButton = (event) => {
		if (event.target.classList.contains('movies-card__favorite_active')) {
			setIsFavorite(false);
		} else {
			setIsFavorite(true);
		}
	};

	const handleDeleteMovie = () => {


	}

	return (
		<li className='movies-card__item'>
			<a
				href={trailerLink}
				target='_blank'
				className='movies-card__trailer-link'
				rel="noreferrer"
			>
				<img src={imageLink} alt='фото фильма' className='movies-card__image'/>
			</a>
			<div className='movies-card__block'>
				<h3 className='movies-card__title'>{nameRU}</h3>

				{location.pathname === '/movies' && (
					<button
						type='button'
						className={cardLikeButtonClassName}
						onClick={handleFavoriteButton}
					></button>
				)}
				{
					location.pathname === '/saved-movies' && (
						<button
							type='button'
							className='movies-card__delete'
							onClick={handleDeleteMovie}
						></button>
					)
				}
			</div>
			<div className='movies-card__time'>
				{hours}ч{minutes}м
			</div>
		</li>
	);
};

export default MoviesCard;
