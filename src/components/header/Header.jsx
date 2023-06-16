import React, { useRef, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/tmovie.png';
import { ReactComponent as Telega } from '../../assets/icons8-telegram-app.svg';
import { Button} from '@mui/material';
import styles from './header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';

const favoritNav = {
	display: 'Главная',
	path: '/favorites',
};

const headerNav = [
	{
		display: 'Главная',
		path: '/',
	},
	{
		display: 'Фильмы',
		path: '/movie',
	},
	{
		display: 'Сериалы',
		path: '/tv',
	},
];

const Header = () => {
	const { pathname } = useLocation();

	const dispatch = useDispatch();

	const onClickLogout = () => {
		if (window.confirm('Вы дейтсвительно хотите выйти')) {
			dispatch(logout());
			localStorage.removeItem('token');
		}
	};

	const isAuth = useSelector(selectIsAuth);
	const headerRef = useRef(null);
	const active = headerNav.findIndex(e => e.path === pathname);

	useEffect(() => {
		const shrinkHeader = () => {
			if (
				document.body.scrollTop > 100 ||
				document.documentElement.scrollTop > 100
			) {
				headerRef.current.classList.add('shrink');
			} else {
				headerRef.current.classList.remove('shrink');
			}
		};
		window.addEventListener('scroll', shrinkHeader);
		return () => {
			window.removeEventListener('scroll', shrinkHeader);
		};
	}, []);

	return (
		<>
			<div ref={headerRef} className='header'>
				<div className='header__wrap container'>
					<div className='logo'>
						<img src={logo} alt='' />
						<Link to='/'>FilmoTeka</Link>
					</div>

					<ul className='header__nav'>
						<Link
							className='telega__container'
							to={'https://t.me/Search_films_love_bot'}
							target='_blank'
						>
							<Telega className='telegram' />
						</Link>
						{headerNav.map((e, i) => (
							<li key={i} className={`${i === active ? 'active' : ''}`}>
								<Link to={e.path}>{e.display}</Link>
							</li>
						))}
					</ul>

					<div className={styles.inner}>
						<div className='container_auth'>
							{isAuth ? (
								<>	
									<Link to={'/favorites'}>
										<ul className='header__nav'>
											<li
												className={`${
													favoritNav.path === active ? 'active' : ''
												}`}
											>
												<div className='favorites'>Библиотека</div>
											</li>
										</ul>
									</Link>
									<Button sx={{marginRight: '-300px'}}
										onClick={onClickLogout}
										variant='contained'
										color='error'
									>
										Выйти
									</Button>
								</>
							) : (
								<>
									<div className='buttons1'>
										<Link to='/login'>
											<Button className='button_login' variant='outlined'>
												Войти
											</Button>
										</Link>
										<Link to='/register'>
											<Button variant='contained'>Создать аккаунт</Button>
										</Link>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
