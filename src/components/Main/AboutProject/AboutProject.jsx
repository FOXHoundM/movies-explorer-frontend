import React from 'react';
import './AboutProject.css'

const AboutProject = () => {
	return (
		<section className='about' id='about'>
			<div className="about__container">
				<h2 className="about__title">О проекте</h2>
				<ul className="about__list">
					<li className="about__item">
						<h3 className="about__item_title">Дипломный проект включал 5 этапов</h3>
						<p className="about__item_title_text">Составление плана, работу над бэкендом, вёрстку, добавление
							функциональности и финальные доработки.</p>
					</li>
					<li className="about__item">
						<h3 className="about__item_title">На выполнение диплома ушло 5 недель</h3>
						<p className="about__item_title_text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
							соблюдать, чтобы успешно защититься.</p>
					</li>
				</ul>

				<ul className="about__dates">
					<li className="about__dates_item">
						<p className='about__dates_time about__dates_time_green'>
							1 неделя
						</p>
						<p className='about__dates_tech'>Back-end</p>
					</li>
					<li className="about__dates_item">
						<p className='about__dates_time about__dates_time_grey'>
							4 неделя
						</p>
						<p className='about__dates_tech'>Front-end</p>
					</li>
				</ul>

			</div>


		</section>
	);
};

export default AboutProject;
