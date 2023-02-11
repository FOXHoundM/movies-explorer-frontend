import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({ movies, cardType }) {
	return (
		<section className='movies-card-list'>
			<ul className='movies-card-list__list-container'>
				{movies.map((movie) => (
					<MoviesCard
						key={movie.id}
						cardType={cardType}
						nameRU={movie.nameRU}
						duration={movie.duration}
						imageLink={`https://api.nomoreparties.co/${movie.image.url}`}
					/>
				))}
			</ul>
		
		</section>
	);
}
