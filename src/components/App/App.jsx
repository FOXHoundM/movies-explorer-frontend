import './App.css';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import Main from '../Main/Main';
import {useState} from 'react';
import Movies from './../Movies/Movies';
import Login from './../User/Login/Login';
import Register from './../User/Register/Register';
import Profile from '../User/Profile/Profile';
import {CurrentUserContext} from '../../context/CurrentUserContext';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from "../ProtectedRoute";
import SavedMovies from "../SavedMovies/SavedMovies";
import {movies} from "../../utils/constants";

function App() {
	const location = useLocation();
	const navigate = useNavigate();

	const [currentUser, setCurrentUser] = useState({});

	const [loggedIn, setLoggedIn] = useState(false);
	const [isErrorRegisterBtn, setIsErrorRegisterBtn] = useState(false);
	const [isRegisterMessage, setRegisterMessage] = useState(false);
	const [isLoginMessage, setLoginMessage] = useState(false);
	const [isErrorLoginBtn, setIsErrorLoginBtn] = useState(false);
	const [isProfileMessage, setIsProfileMessage] = useState(false);

	const onRegister = (name, email, password) => {
		if ((name, email, password)) {
			onLogin(email, password);
		} else {
			setIsErrorRegisterBtn(true);
		}
	};

	const onLogin = (email, password) => {
		if ((email, password)) {
			navigate('/movies');
			setLoggedIn(true);
		} else {
			setIsErrorLoginBtn(true);
		}
	};
	const onUpdateUser = (name, email) => {
		if ((name, email)) {
			setIsProfileMessage(true);
			setCurrentUser({name, email});
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
		<div className='App'>
			<CurrentUserContext.Provider value={currentUser}>
				<Routes>
					<Route path='/' element={<Main loggedIn={loggedIn}/>}/>

					<Route path='/movies' element={
						<ProtectedRoute loggedIn={loggedIn}>
							<Movies
								movies={movies}

							>

							</Movies>
						</ProtectedRoute>
					}/>

					<Route path='/saved-movies' element={
						<ProtectedRoute loggedIn={loggedIn}>
							<SavedMovies

							>
							</SavedMovies>


						</ProtectedRoute>
					}/>

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

					<Route path='*' element={<PageNotFound/>}/>
				</Routes>
			</CurrentUserContext.Provider>
		</div>
	);
}

export default App;
