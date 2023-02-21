import React from 'react';
import './AboutMe.css'
import student_image from '../../../images/student_image.jpg'

const AboutMe = () => {
	return (
		<section className='about-me' id='student'>
			<div className="about-me__container">
				<h2 className="about-me__title">Студент</h2>
				<div className="about-me__block">
					<div className="about-me__info">
						<h3 className="about-me__student">Микаэль</h3>
						<p className="about-me__profession">Фронтенд-разработчик, 32 лет</p>
						<p className="about-me__description">Я живу в Москве, закончил факультет экономики в АГУЭ(Азербайджан).
							Начал обучение год назад. Прошел большое количество курсов с
							Youtube. Параллельно решаю задачи с CodeWars и создаю новые pet проекты для портфолио. Люблю
							программирование, писать код и решать задачи. На образование трачу все
							свободное время. Планирую продолжить свое развитие в этой сфере.
							Помимо обучения играю в компьютерные игры и люблю читать фэнтези.</p>

						<a href="https://github.com/FOXHoundM" target='_blank' className="about-me__link"
							 rel="noreferrer">Github</a>

					</div>


					<img src={student_image} alt="фото профиля" className="about-me__image"/>
				</div>

			</div>

		</section>
	);
};

export default AboutMe;
