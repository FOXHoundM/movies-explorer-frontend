import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { register } from '../../utils/AuthApi';
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
	//const location = useLocation();
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

	const registerCallback = (name, email, password) => {
		register(name, email, password)
			.then((data) => {
				console.log('data', data);
				if (data) {
					onLogin(email, password);
					setIsAuth(true);
					setIsToolTipOpen(true);
					navigate('/signin');
				}
				setIsErrorRegisterBtn(false);
			})
			.catch((err) => {
				err.status !== 400
					? setRegisterMessage('Пользователь с таким email уже зарегистрирован')
					: setRegisterMessage(
							'При регистрации пользователя произошла ошибка.'
					);
				setIsErrorRegisterBtn(true);
			});
	};

	const onLogin = (email, password) => {};

	const onUpdateUser = (name, email) => {
		if ((name, email)) {
			setIsProfileMessage(true);
			setIsToolTipOpen(true);
			setCurrentUser({ name, email });
		} else {
			setIsProfileMessage(false);
		}
	};

	const onSignOut = () => {
		navigate('/');
		setLoggedIn(false);
		setCurrentUser({});
		setRegisterMessage(false);
		setLoginMessage(false);
		setIsErrorLoginBtn(false);
		setIsErrorRegisterBtn(false);
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
								onRegister={registerCallback}
								isErrorRegisterBtn={isErrorRegisterBtn}
								isRegisterMessage={isRegisterMessage}
							/>
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
