import React from 'react';

import './footer.scss';

import { Link } from 'react-router-dom';

import logo from '../../assets/tmovie.png';

const Footer = () => {
	return (
		<div className='footer'>
			<div className='item_footer'>
				<div className='footer__content container'>
					<div className='footer__content__logo'>
						<div className='logo'>
							<img src={logo} alt='' />
							<Link to='/'>FilmoTeka</Link>
						</div>
					</div>
					<div className='footer__content__menus'>
						<div className='footer__content__menu'>
							<Link to='/'>Главная</Link>
							<Link to='/'>Контакты</Link>
							<Link to='/'>О нас</Link>
						</div>
						<div className='footer__content__menu'>
							<Link to='/'>FAQ</Link>
							<Link to='/'>Premium</Link>
							<Link to='/'>Pravacy policy</Link>
						</div>
						<div className='footer__content__menu'>
							<Link to='/'>You must watch</Link>
							<Link to='/'>Recent release</Link>
							<Link to='/'>Top IMDB</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
