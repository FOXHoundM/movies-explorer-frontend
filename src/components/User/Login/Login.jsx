import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Login = () => {
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
			<main className='login'>
				<div className='login__container'>
					<header className='login__header'>
						<Link to='/' className='login__logo'></Link>
						<h2 className='login__title'>Рады видеть!</h2>
					</header>
				</div>

				<form noValidate className='login__form' onSubmit={handleSubmit(onSubmit)}>
					<label className='login__label'>
						<p className='login__label_title login__label_title_email'>E-mail</p>
						<input
							className='login__label_input login__label_input_email'
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
						{errors?.email && <p className='error error__email'>{errors.email.message}</p>}
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
							{...register('password', {
								required: 'Поле обязательно к заполнению',
								minLength: {
									value: 5,
									message: 'Пароль должен состоять минимум из 5 символов'
								}
							})}
						/>
						{errors?.password && <p className='error error__password'>{errors.password.message}</p>}
					</label>

					<input disabled={!isValid}
						type='submit'
						className='login__submit_btn'/>

					{/*<button
						disabled={!isValid}
						type='submit'
						className='login__submit_btn'
					>
						Войти
					</button>*/}
					<Link className='login__subtitle' to='/signup'>
						Ещё не зарегистрированы?{' '}
						<span className='login__subtitle_link'>Регистрация</span>
					</Link>
				</form>
			</main>
		</>
	);
};

export default Login;
