import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import {useFormWithValidation} from "../../../utils/hooks/useFormValidation";

const Login = () => {

	const controlInput = useFormWithValidation();
	const {email, password} = controlInput.errors;

	// const errorClassName = !controlInput.isValid ? 'error'


	return (
		<>
			<main className='login'>
				<div className='login__container'>
					<header className='login__header'>
						<Link to='/' className='login__logo'></Link>
						<h2 className='login__title'>Рады видеть!</h2>
					</header>
				</div>

				<form noValidate className='login__form' >
					<label className='login__label'>
						<p className='login__label_title login__label_title_email'>E-mail</p>
						<input
							className='login__label_input login__label_input_email'
							type='email'
							autoComplete='off'
							name='e-mail'
							placeholder='E-mail'
							id='email'

						/>
						<p className='error error__email'></p>
					</label>

					<label className='login__label'>
						<p className='login__label_title login__label_title_password'>Пароль</p>
						<input
							className='login__label_input login__label_input_password'
							type='password'
							autoComplete='off'
							name='password'
							id='password'
							placeholder='Пароль'
						/>
						<p className='error error__password'></p>
					</label>


					<button
						// disabled
						type='submit'
						className='login__submit_btn'
					>
						Войти
					</button>
					<span className='login__subtitle'>
						Ещё не зарегистрированы?{' '}
						<Link to='/signup' className='login__subtitle_link'>Регистрация</Link>
					</span>
				</form>
			</main>
		</>
	);
};

export default Login;
