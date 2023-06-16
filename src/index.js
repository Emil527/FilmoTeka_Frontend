import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

const container = document.getElementById('root');

const root = createRoot(container);
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<Routes>
				<Route path='*' element={<App />}></Route>
			</Routes>
		</Provider>
	</BrowserRouter>
);
