import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";
import Header from "../Header/Header";
import MoviesHeader from "../Header/MoviesHeader/MoviesHeader";
import React from "react";
import {movies} from "../../utils/constants";


export default function Movies() {
	return (<>
			<Header color={'header__color_white'}>
				<MoviesHeader/>
			</Header>
			<article className="movies-page">
				<SearchForm/>
				<MoviesCardList movies={movies} cardType="searchMovie"/>
				<Preloader/>
			</article>
		</>

	);
}
