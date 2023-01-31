import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Register = () => {
	const {
		register,
		formState: { errors, isValid },
		reset,
		handleSubmit,
	} = useForm({
		mode: 'onChange',
	});

	const onSubmit = (data) => {
		reset();
		alert(JSON.stringify(data));
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

				<form
					noValidate
					className='register__form'
					onSubmit={handleSubmit(onSubmit)}
				>
					<label className='register__label'>
						<p className='register__label_title register__label_title_email'>
							E-mail
						</p>
						<input
							className='register__label_input register__label_input_email'
							type='email'
							autoComplete='off'
							name='e-mail'
							placeholder='E-mail'
							id='email'
							{...register('email', {
								required: 'Поле обязательно к заполнению',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'Неправильно введен email',
								},
							})}
						/>
						{errors?.email && (
							<p className='error error__email'>{errors.email.message}</p>
						)}
					</label>

					<label className='register__label'>
						<p className='register__label_title register__label_title_password'>
							Пароль
						</p>
						<input
							className='register__label_input register__label_input_password'
							type='password'
							autoComplete='off'
							name='password'
							id='password'
							placeholder='Пароль'
							{...register('password', {
								required: 'Поле обязательно к заполнению',
								minLength: {
									value: 5,
									message: 'Пароль должен состоять минимум из 5 символов',
								},
							})}
						/>
						{errors?.password && (
							<p className='error error__password'>{errors.password.message}</p>
						)}
					</label>

					<button
						disabled={!isValid}
						type='submit'
						className='register__submit_btn'
					>
						Зарегистрироваться
					</button>
					<Link className='register__subtitle' to='/signup'>
					Уже зарегистрированы?{' '}
						<span className='register__subtitle_link'>Войти</span>
					</Link>
				</form>
			</main>
		</>
	);
};

export default Register;
