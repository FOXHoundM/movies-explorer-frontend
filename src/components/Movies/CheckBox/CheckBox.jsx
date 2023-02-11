import React from 'react';
import './CheckBox.css'

const CheckBox = ({id}) => {

	return (
		<fieldset className="checkbox">
			<label className="checkbox__switch">
				<input
					type="checkbox"
					className="checkbox__input"
					id={id}
				/>
				<span className="checkbox__slider"></span>
			</label>
			Короткометражки
		</fieldset>
	);
};

export default CheckBox;
