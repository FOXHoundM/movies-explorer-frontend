import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({movies, cardType}) {
	return (
		<section className="moviesCardList">
			<ul className="moviesCardList__list">
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
