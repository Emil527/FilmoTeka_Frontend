import 'swiper/swiper.min.css';

import './App.scss';

import { Route, Routes } from 'react-router-dom';

import Detail from './pages/detail/Detail';
import Catalog from './pages/Catalog';

import { Login } from './pages/Login/index';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import { Registration } from './pages/Registration';
import FavoriteList from './pages/FavoriteList';
import { AuthContext } from './components/Context/Contex';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';

function App() {
	const [Context, setContext] = useState([]);
	const dispatch=useDispatch()
	const isAuth = useSelector(selectIsAuth);

	React.useEffect(() => { 
		dispatch(fetchAuthMe())
	},[])

	return (
		<>
			<AuthContext.Provider value={[Context, setContext]}>
				<Header />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/:category/search/:keyword' element={<Catalog />} />
					<Route path='/:category/:id' element={<Detail />} />
					<Route path='/:category' element={<Catalog />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Registration />} />
					<Route path='/favorites' element={<FavoriteList />} />
				</Routes>
				<Footer />
			</AuthContext.Provider>
		</>
	);
}

export default App;
