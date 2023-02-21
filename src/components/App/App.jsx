import { useCallback, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import {
	authorize,
	checkToken,
	getUserInfo,
	register,
	updateUserInfo,
} from '../../utils/AuthApi';
import InfoToolTip from '../InfoTooltip/InfoTooltip';
import Main from '../Main/Main';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../User/Profile/Profile';
import mainApi from './../../utils/MainApi';
import moviesApi from './../../utils/MoviesApi';
import Movies from './../Movies/Movies';
import Login from './../User/Login/Login';
import Register from './../User/Register/Register';
import './App.css';

function App() {
	const location = useLocation();
	const navigate = useNavigate();
	const [loggedIn, setLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState({});
	const [isErrorRegisterBtn, setIsErrorRegisterBtn] = useState(false);
	const [isRegisterMessage, setRegisterMessage] = useState(false);
	const [isLoginMessage, setLoginMessage] = useState(false);
	const [isErrorLoginBtn, setIsErrorLoginBtn] = useState(false);
	const [movies, setMovies] = useState([]);
	const [savedMovies, setSavedMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isFailed, setIsFailed] = useState(false);
	const [checked, setChecked] = useState(true);
	const [checkedSaveMovies, setCheckedSaveMovies] = useState(true);
	const [isNotFound, setIsNotFound] = useState(false);
	const [allSavedMovies, setAllSavedMovies] = useState([]);
	const [isProfileMessage, setIsProfileMessage] = useState(false);

	const [isAuth, setIsAuth] = useState(false);

	const [isToolTipOpen, setIsToolTipOpen] = useState(false);

	const closeAllPopups = () => {
		setIsToolTipOpen(false);
	};

	const onRegister = (name, email, password) => {
		register(name, email, password)
			.then((data) => {
				console.log('data', data);
				if (data) {
					onLogin(email, password);
					setIsAuth(true);
					setIsToolTipOpen(true);
					setTimeout(() => navigate('/signin'), 300);
				}
				setIsErrorRegisterBtn(false);
			})
			.catch((err) => {
				err.status !== 400
					? setRegisterMessage(
							'Пользователь c таким email уже существует, попробуйте другой email'
					  )
					: setRegisterMessage(
							'При регистрации пользователя произошла ошибка.'
					  );
				setIsErrorRegisterBtn(true);
			});
	};

	const onLogin = (email, password) => {
		authorize(email, password)
			.then((res) => {
				if (res.token) {
					localStorage.setItem('jwt', res.token);
					console.log(res);
					setIsErrorLoginBtn(false);
					checkToken(res.token).then((res) => {
						if (res) {
							setLoggedIn(true);
							setIsAuth(true);
							setCurrentUser(res);
							setIsToolTipOpen(true);
							setTimeout(() => navigate('/movies'), 800);
						}
					});
				}
			})
			.catch((err) => {
				if (err.includes(401)) {
					setLoginMessage('Вы ввели неправильный логин или пароль.');
				}
				setIsErrorLoginBtn(true);
			});
	};

	const onSignOut = useCallback(() => {
		localStorage.removeItem('jwt');
		navigate('/');
		setLoggedIn(false);
		setCurrentUser({});
		setIsErrorRegisterBtn(false);
		setRegisterMessage(false);
		setLoginMessage(false);
		setIsErrorLoginBtn(false);
		setIsLoading(false);
		setIsFailed(false);
		setMovies([]);
		setSavedMovies([]);
		setAllSavedMovies([]);
		setChecked(true);
		setCheckedSaveMovies(true);
		setIsNotFound(false);
	}, [navigate]);

	useEffect(() => {
		if (loggedIn) {
			mainApi
				.getSavedMovies()
				.then((res) => {
					setSavedMovies(res);
				})
				.catch((err) => {
					console.log(err);
				});
			getUserInfo()
				.then((data) => {
					setCurrentUser(data);
				})
				.catch((err) => {
					console.error(`Данные пользователя не получены: ${err}`);
				});
			if (JSON.parse(localStorage.getItem('filteredMovies'))) {
				setMovies(JSON.parse(localStorage.getItem('filteredMovies')));
				setChecked(JSON.parse(localStorage.getItem('checkbox')));
				setCheckedSaveMovies(
					JSON.parse(localStorage.getItem('checkboxSaveMovies'))
				);
			}
		}
	}, [loggedIn]);

	const checkTokenCallback = useCallback(() => {
		const jwt = localStorage.getItem('jwt');

		if (jwt) {
			checkToken(jwt)
				.then((res) => {
					if (res) {
						setLoggedIn(true);
						//navigate(location.pathname);
					}
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}, []);

	useEffect(() => {
		checkTokenCallback();
	}, [checkTokenCallback]);

	const onUpdateUser = (name, email) => {
		updateUserInfo(name, email)
			.then((data) => {
				console.log('🚀 ~ file: App.jsx:143 ~ .then ~ data', data);
				setIsProfileMessage(true);
				setCurrentUser(data);
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				setTimeout(() => setIsProfileMessage(false), 1000);
			});
	};

	const handleSaveMovie = (movie) => {
		mainApi
			.addMovie(movie)
			.then((data) => {
				setSavedMovies([data, ...savedMovies]);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleDeleteMovie = (movie) => {
		const savedMovie = savedMovies.find(
			(item) => item.movieId === movie.movieId
		);

		mainApi
			.deleteMovie(savedMovie._id)
			.then(() => {
				const newMoviesList = savedMovies.filter(
					(item) => item._id !== savedMovie._id
				);

				setSavedMovies(newMoviesList);
			})
			.catch((err) => {
				setIsToolTipOpen(true);
				console.log(err);
			});
	};

	const handleChangeCheckbox = (evt) => {
		if (location.pathname === '/movies') {
			setChecked(!checked);
			localStorage.setItem('checkbox', !checked);
		} else if (location.pathname === '/saved-movies') {
			setCheckedSaveMovies(!checkedSaveMovies);
			localStorage.setItem('checkboxSaveMovies', !checkedSaveMovies);
		}
	};

	const searchMovies = (movies, name) => {
		return movies.filter((item) =>
			item.nameRU.toLowerCase().includes(name.toLowerCase())
		);
	};

	const handleSearchMovies = (name) => {
		if (!JSON.parse(localStorage.getItem('allMovies'))) {
			moviesApi
				.getAllMovies()
				.then((movies) => {
					const before = movies.slice(0, 23);
					const after = movies.slice(24);
					const arrMovies = before.concat(after);
					localStorage.setItem('allMovies', JSON.stringify(arrMovies));
				})
				.then(() => {
					setIsLoading(true);
					const searchArr = searchMovies(
						JSON.parse(localStorage.getItem('allMovies')),
						name
					);
					setMovies(searchArr);
					setIsNotFound(!movies.length && !isFailed);
					localStorage.setItem('filteredMovies', JSON.stringify(searchArr));
					localStorage.setItem('searchKeyword', name);
					localStorage.setItem('checkbox', checked);
					setTimeout(() => setIsLoading(false), 1000);
				})
				.catch((err) => {
					setIsFailed(true);
					console.log(err);
				});
		} else if (JSON.parse(localStorage.getItem('allMovies'))) {
			setIsLoading(true);
			const searchArr = searchMovies(
				JSON.parse(localStorage.getItem('allMovies')),
				name
			);
			setMovies(searchArr);
			setIsNotFound(!movies.length || !isFailed);
			localStorage.setItem('filteredMovies', JSON.stringify(searchArr));
			localStorage.setItem('searchKeyword', name);
			localStorage.setItem('checkbox', checked);
			setTimeout(() => setIsLoading(false), 1000);
		}
	};

	const handleSearchSavedMovies = (name) => {
		setIsLoading(true);
		mainApi
			.getSavedMovies()
			.then((movies) => {
				setAllSavedMovies(movies);
				localStorage.setItem('checkboxSaveMovies', checkedSaveMovies);
				const userSavedMovies = movies.filter((movie) => {
					return movie.owner === currentUser._id;
				});
				const searchArr = searchMovies(userSavedMovies, name);
				setSavedMovies(searchArr);
				setIsNotFound(!searchArr.length && !isFailed);
				setTimeout(() => setIsLoading(false), 1000);
			})
			.catch((err) => console.log(err));

		const searchArr = searchMovies(allSavedMovies, name);

		setSavedMovies(searchArr);
		setIsNotFound(!searchArr.length || !isFailed);
		setTimeout(() => setIsLoading(false), 1000);
	};

	return (
		<div className='page'>
			<CurrentUserContext.Provider value={currentUser}>
				<Routes>
					<Route path='/' element={<Main loggedIn={loggedIn} />} />

					<Route element={<ProtectedRoute loggedIn={loggedIn} />}>
						<Route
							path='/movies'
							element={
								<Movies
									onSubmit={handleSearchMovies}
									movies={movies}
									isLoading={isLoading}
									isFailed={isFailed}
									isNotFound={isNotFound}
									searchKeyword={localStorage.getItem('searchKeyword')}
									onCheckbox={handleChangeCheckbox}
									checked={checked}
									checkedSaveMovies={checkedSaveMovies}
									savedMovies={savedMovies}
									onSave={handleSaveMovie}
									onDelete={handleDeleteMovie}
									allSavedMovies={allSavedMovies}
								></Movies>
							}
						/>

						<Route
							path='/saved-movies'
							element={
								<SavedMovies
									onSubmit={handleSearchSavedMovies}
									movies={movies}
									isLoading={isLoading}
									isFailed={isFailed}
									isNotFound={isNotFound}
									searchKeyword={localStorage.getItem('searchKeyword')}
									onCheckbox={handleChangeCheckbox}
									checked={checked}
									checkedSaveMovies={checkedSaveMovies}
									savedMovies={savedMovies}
									onSave={handleSaveMovie}
									onDelete={handleDeleteMovie}
									allSavedMovies={allSavedMovies}
								></SavedMovies>
							}
						/>

						<Route
							path='/profile'
							element={
								<Profile
									onUpdateUser={onUpdateUser}
									onSignOut={onSignOut}
									isProfileMessage={isProfileMessage}
								/>
							}
						/>
					</Route>

					<Route
						path='/signin'
						element={
							<Login
								onLogin={onLogin}
								isLoginMessage={isLoginMessage}
								isErrorLoginBtn={isErrorLoginBtn}
							/>
						}
					/>

					<Route
						path='/signup'
						element={
							<Register
								onRegister={onRegister}
								isErrorRegisterBtn={isErrorRegisterBtn}
								isRegisterMessage={isRegisterMessage}
							/>
						}
					/>

					<Route path='*' element={<PageNotFound />} />
				</Routes>

				<InfoToolTip
					successReg='Вы успешно зарегистрировались!'
					failedReg='Что-то пошло не так! Попробуйте ещё раз.'
					isOpen={isToolTipOpen}
					onClose={closeAllPopups}
					isSuccess={isAuth}
				/>
			</CurrentUserContext.Provider>
		</div>
	);
}

export default App;
