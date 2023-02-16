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
import Movies from './../Movies/Movies';
import Login from './../User/Login/Login';
import Register from './../User/Register/Register';
import './App.css';

function App() {
	const location = useLocation();
	const navigate = useNavigate();

	const [currentUser, setCurrentUser] = useState({});

	const [loggedIn, setLoggedIn] = useState(false);
	const [isErrorRegisterBtn, setIsErrorRegisterBtn] = useState(false);
	const [isRegisterMessage, setRegisterMessage] = useState('');
	const [isLoginMessage, setLoginMessage] = useState(false);
	const [isErrorLoginBtn, setIsErrorLoginBtn] = useState(false);
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

	const onSignOut = useCallback (() => {
		localStorage.removeItem('jwt');
		navigate('/');
		setLoggedIn(false);
		setCurrentUser({});
		setIsErrorRegisterBtn(false);
		setRegisterMessage(false);
		setLoginMessage(false);
		setIsErrorLoginBtn(false);
	}, [navigate])

	useEffect(() => {
		if (loggedIn) {
			getUserInfo()
				.then((data) => {
					console.log("🚀 ~ file: App.jsx:108 ~ .then ~ data", data)
					setCurrentUser(data);
				})
				.catch((err) => {
					console.error(`Данные пользователя не получены: ${err}`);
				});
		}
	}, [loggedIn]);

	const checkTokenCallback = useCallback(() => {
		const jwt = localStorage.getItem('jwt');

		if (jwt) {
			checkToken(jwt)
				.then((res) => {
					if (res) {
						setLoggedIn(true);
						navigate(location.pathname)
					}
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}, [navigate, location.pathname]);

	useEffect(() => {
		checkTokenCallback();
	}, [checkTokenCallback]);

	

	const onUpdateUser = (name, email) => {
		updateUserInfo(name, email)
			.then((data) => {
				console.log("🚀 ~ file: App.jsx:143 ~ .then ~ data", data)
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



	return (
		<div className='page'>
			<CurrentUserContext.Provider value={currentUser}>
				<Routes>
					<Route path='/' element={<Main loggedIn={loggedIn} />} />

					<Route
						path='/movies'
						element={
							<ProtectedRoute loggedIn={loggedIn}>
								<Movies></Movies>
							</ProtectedRoute>
						}
					/>

					<Route
						path='/saved-movies'
						element={
							<ProtectedRoute loggedIn={loggedIn}>
								<SavedMovies></SavedMovies>
							</ProtectedRoute>
						}
					/>

					<Route
						path='/profile'
						element={
							<ProtectedRoute loggedIn={loggedIn}>
								<Profile
									onUpdateUser={onUpdateUser}
									onSignOut={onSignOut}
									isProfileMessage={isProfileMessage}
								/>
							</ProtectedRoute>
						}
					/>

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
