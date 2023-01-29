import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from '../Main/Main';
import { useState } from 'react';
import Movies from './../Movies/Movies';
import Login from './../User/Login/Login';

function App() {
	const [loggedIn, setLoggedIn] = useState(false);

	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Main loggedIn={loggedIn} />} />

				<Route path='/movies' element={<Movies />} />
				<Route path='/signin' element={<Login/>} />
			</Routes>
		</div>
	);
}

export default App;
