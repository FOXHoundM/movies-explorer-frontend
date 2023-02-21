import React from 'react';
import './Portfolio.css'

const Portfolio = () => {
	return (
		<section className='portfolio'>
			<div className="portfolio__container">
				<h2 className="portfolio__title">Портфолио</h2>

				<ul className="portfolio__list">
					<li className="portfolio__item">
						<a href="https://foxhoundm.github.io/how-to-learn/" target='_blank'
							 className="portfolio__link" rel="noopener noreferrer">Статичный сайт</a>
						<a
							className='portfolio__arrow'
							href='https://foxhoundm.github.io/how-to-learn/'
							target='_blank'
							rel="noreferrer"
						>

						</a>
					</li>
					<li className="portfolio__item">
						<a href="https://foxhoundm.github.io/russian-travel/" target='_blank'
							 className="portfolio__link" rel="noreferrer">Адаптивный сайт</a>
						<a
							className='portfolio__arrow'
							href='https://foxhoundm.github.io/russian-travel/'
							target='_blank' rel="noreferrer"
						>

						</a>

					</li>
					<li className="portfolio__item">
						<a href="https://foxhoundm.github.io/mesto-react-auth/" target='_blank'
							 className="portfolio__link" rel="noreferrer">Одностраничное приложение</a>
						<a
							className='portfolio__arrow'
							href='https://foxhoundm.github.io/mesto-react-auth/'
							target='_blank' rel="noreferrer"
						>
							
						</a>
					</li>
				</ul>


			</div>

		</section>
	);
};

export default Portfolio;
