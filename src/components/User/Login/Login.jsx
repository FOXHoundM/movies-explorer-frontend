import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
	return (
		<>
			<main className='login'>
				<div className='login__container'>
					<header className='login__header'>
						<Link to='/' className='login__logo'></Link>
						<h2 className='login__title'>Рады видеть!</h2>
					</header>
				</div>

				<form className='login__form'>
					
					<label className='login__label'>
						<p className='login__label_title'>E-mail</p>
						<input className='login__label_input'/>
					</label>

					<label className='login__label'>
						<p className='login__label_title'>Пароль</p>
						<input className='login__label_input'/>
					</label>

					<button className='login__submit_btn' >Войти</button>
					


				</form>

				
			</main>
		</>
	);
};

export default Login;
