import React from 'react';
import './Login.css';
import {Link} from 'react-router-dom';
import useFormWithValidation from "../../../utils/hooks/useFormValidation";

const Login = ({onLogin, isErrorLoginBtn, isLoginMessage}) => {

	const controlInput = useFormWithValidation();
	const {email, password} = controlInput.errors;

	const errorClassName = !controlInput.isValid ? 'login__error login__error_visible' : 'login__error';

	const errorClassNameBtn = isErrorLoginBtn
		? 'login__error login__error_visible'
		: 'login__error';

	const handleSubmit = (e) => {
		e.preventDefault();
		const {email, password} = controlInput.values;
		onLogin(email, password);
		controlInput.resetForm();
	};

	return (
		<>
			<main className='login'>
				<div className='login__container'>
					<header className='login__header'>
						<Link to='/' className='login__logo'></Link>
						<h2 className='login__title'>Рады видеть!</h2>
					</header>
				</div>

				<form noValidate className='login__form' onSubmit={handleSubmit}>
					<label className='login__label'>
						<p className='login__label_title login__label_title_email'>E-mail</p>
						<input
							className='login__label_input login__label_input_email'
							type='email'
							autoComplete='off'
							name='email'
							placeholder='E-mail'
							id='email'
							pattern='^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
							required
							minLength="5"
							maxLength="40"
							onChange={controlInput.handleChange}
							value={controlInput?.values?.email || ''}
						/>
						<p className={errorClassName}>{email}</p>
					</label>

					<label className='login__label'>
						<p className='login__label_title login__label_title_password'>Пароль</p>
						<input
							className='login__label_input login__label_input_color'
							type='password'
							autoComplete='off'
							name='password'
							id='password'
							placeholder='Пароль'
							minLength='5'
							maxLength='40'
							onChange={controlInput.handleChange}
							value={controlInput?.values?.password || ''}
							required
						/>
						<p className={errorClassName}>{password}</p>
					</label>


					<span className={errorClassNameBtn}>{isLoginMessage}</span>
					<button
						disabled={!controlInput.isValid}
						type='submit'
						className='login__submit_btn'
					>
						Войти
					</button>
					<p className='login__subtitle'>
						Ещё не зарегистрированы?{' '}
						<Link to='/signup' className='login__subtitle_link'>Регистрация</Link>
					</p>
				</form>
			</main>
		</>
	);
};

export default Login;
