import React, {useState} from 'react';
import './SearchForm.css'
import CheckBox from "../CheckBox/CheckBox";

const SearchForm = () => {

	const [errorText, setErrorText] = useState('');
	const [keyword, setKeyword] = useState('');
	const [isFormValid, setIsFormValid] = useState(false);

	const handleChange = (evt) => {
		setKeyword(evt.target.value);
		setIsFormValid(evt.target.closest('form').checkValidity());
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();

		setIsFormValid(evt.target.closest('form').checkValidity());
		if (!isFormValid) {
			return setErrorText('Нужно ввести ключевое слово');
		}
	};

	return (
		<section className='search'>
			<div className="search__container">

				<form action="#" className="search__form" onSubmit={handleSubmit}>

					<input type='text'
								 className='search__input'
								 placeholder='Фильм'
								 required
								 onChange={handleChange}
								 value={keyword}
								 minLength='1'
								 maxLength='30'
					/>

					<button type='submit' className="search__button"></button>

					<p className='search__error'>{errorText}</p>
				</form>

				<CheckBox/>

			</div>

		</section>
	);
};

export default SearchForm;
