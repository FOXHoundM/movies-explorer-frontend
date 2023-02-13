import React from 'react';
import useFormWithValidation from "../../../utils/hooks/useFormValidation";
import {Link} from "react-router-dom";
import './Register.css'

const Register = ({isErrorRegisterBtn, onRegister, isRegisterMessage}) => {
	const controlInput = useFormWithValidation();
	const {name, email, password} = controlInput.errors;

	const errorClassName = !controlInput.isValid ? 'register__error register__error_visible' : 'register__error';

	const errorClassNameBtn = isErrorRegisterBtn
		? 'register__error register__error_visible'
		: 'register__error';

	const handleRegSubmit = (e) => {
		e.preventDefault();
		const {name, email, password} = controlInput.values;
		onRegister({name, email, password});
		controlInput.resetForm();
	};

	return (
		<>
			<main className='register'>
				<div className='register__container'>
					<header className='register__header'>
						<Link to='/' className='register__logo'></Link>
						<h2 className='register__title'>Добро пожаловать!</h2>
					</header>
				</div>

				<form noValidate className='register__form' onSubmit={handleRegSubmit}>
					<label className='register__label'>
						<p className='register__label_title register__label_title_name'>Имя</p>
						<input
							className='register__label_input register__label_input_name'
							type='name'
							autoComplete='off'
							name='name'
							placeholder='Имя'
							id='name'
							required
							pattern='[A-Za-zА-Яа-яЁё\s-]+'
							minLength="4"
							maxLength="40"
							onChange={controlInput.handleChange}
							value={controlInput?.values?.name || ''}
						/>
						<p className={errorClassName}>{name}</p>
					</label>

					<label className='register__label'>
						<p className='register__label_title register__label_title_email'>E-mail</p>
						<input
							className='register__label_input register__label_input_email'
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

					<label className='register__label'>
						<p className='register__label_title register__label_title_password'>Пароль</p>
						<input
							className='register__label_input register__label_input_color'
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


					<p className={errorClassNameBtn}>{isRegisterMessage}</p>
					<button
						disabled={!controlInput.isValid}
						type='submit'
						className='register__submit_btn'
					>
						Зарегистрироваться
					</button>
					<p className='register__subtitle'>
						Уже зарегистрированы?{' '}
						<Link to='/signin' className='register__subtitle_link'>Войти</Link>
					</p>
				</form>
			</main>

		</>
	);
};

export default Register;
