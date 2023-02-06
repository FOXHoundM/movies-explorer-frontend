import React from 'react';
import './Footer.css'

const Footer = () => {
	return (
		<footer className='footer'>

			<div className="footer__container">
				<h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>

				<div className="footer__list_container">
					<p className="footer__copyright">© 2023</p>
					<ul className="footer__list">
						<li className="footer__item">
							<a href="https://practicum.yandex.ru/" target='_blank' className="footer__link">
								Яндекс.Практикум
							</a>
						</li>
						<li className="footer__item">
							<a href="https://github.com/FOXHoundM" target='_blank' className="footer__link">
								Github
							</a>
						</li>
					</ul>
				</div>


			</div>

		</footer>
	);
};

export default Footer;
