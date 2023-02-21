import React, { useContext, useState } from 'react';
import { CurrentUserContext } from '../../../context/CurrentUserContext';
import useFormWithValidation from '../../../utils/hooks/useFormValidation';
import Header from '../../Header/Header';
import MoviesHeader from '../../Header/MoviesHeader/MoviesHeader';
import './Profile.css';

const Profile = ({ onUpdateUser, onSignOut, isProfileMessage }) => {
	const currentUser = useContext(CurrentUserContext);
	const [isEditInput, setIsEditInput] = useState(true);
	const controlInput = useFormWithValidation();
	const { nameErr, emailErr } = controlInput.errors;
	const errorClassName = !controlInput.isValid
		? 'profile__error profile__error_visible'
		: 'profile__error';

	const toggleInput = (e) => {
		e.preventDefault();
		setIsEditInput((state) => !state);
	};

	let disableUserCurrentCheck =
		(currentUser.name === controlInput?.values?.name &&
			typeof controlInput?.values?.email === 'undefined') ||
		(currentUser.email === controlInput?.values?.email &&
			typeof controlInput?.values?.email === 'undefined');

	const handleSubmit = (e) => {
		e.preventDefault();
		const { name, email } = controlInput.values;
		if (!name) {
			onUpdateUser(currentUser.name, email);
		} else if (!email) {
			onUpdateUser(name, currentUser.email);
		} else {
			onUpdateUser(name, email);
		}

		setTimeout(() => setIsEditInput((state) => !state), 1000);
		controlInput.resetForm();
	};

	let classNameMessageBtn = isProfileMessage
		? 'profile__button-msg'
		: 'profile__button-msg profile__button-msg_hidden';

	return (
		<>
			<Header
				color={'header__color_white'}
				location={'header__container_movies'}
			>
				<MoviesHeader />
			</Header>

			<main className='profile'>
				<div className='profile__container'>
					<h1 className='profile__title'>Привет, {currentUser.name}</h1>

					<form className='profile__form' onSubmit={handleSubmit} noValidate>
						<fieldset className='profile__field'>
							<label className='profile__label'>
								<p className='profile__label_title profile__label_title_name'>
									Имя
								</p>
								<input
									className='profile__label_input profile__label_input_name'
									type='name'
									autoComplete='off'
									name='name'
									placeholder={currentUser.name}
									id='name'
									required
									pattern='[A-Za-zА-Яа-яЁё\s-]+'
									minLength='4'
									maxLength='40'
									onChange={controlInput.handleChange}
									value={controlInput?.values?.name ?? currentUser.name}
									{...(!isEditInput ? {} : { disabled: true })}
								/>
								<p className={errorClassName}>{nameErr}</p>
							</label>

							<label className='profile__label'>
								<p className='profile__label_title profile__label_title_email'>
									E-mail
								</p>
								<input
									className='profile__label_input profile__label_input_email'
									type='email'
									autoComplete='off'
									name='email'
									placeholder={currentUser.email}
									id='email'
									required
									pattern='^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
									minLength='5'
									maxLength='40'
									onChange={controlInput.handleChange}
									value={controlInput?.values?.email ?? currentUser.email}
									{...(!isEditInput ? {} : { disabled: true })}
								/>
								<p className={errorClassName}>{emailErr}</p>
							</label>
						</fieldset>

						{!isEditInput && (
							<>
								<p className={classNameMessageBtn}>
									Изменение данных прошло успешно!
								</p>
								<button
									className='profile__button'
									disabled={disableUserCurrentCheck || !controlInput.isValid}
								>
									Сохранить
								</button>
							</>
						)}
					</form>

					{isEditInput && (
						<ul className='profile__list'>
							<li className='profile__item'>
								<button className='profile__edit' onClick={toggleInput}>
									Редактировать
								</button>
							</li>
							<li className='profile__item'>
								<button className='profile__logout' onClick={onSignOut}>
									Выйти из аккаунта
								</button>
							</li>
						</ul>
					)}
				</div>
			</main>
		</>
	);
};

export default Profile;
