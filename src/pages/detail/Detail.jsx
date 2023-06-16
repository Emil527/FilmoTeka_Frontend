import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './detail.scss';
import CastList from './CastList';
import VideoList from './VideoList';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import MovieList from '../../components/movie-list/MovieList';
import {Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AuthContext } from '../../components/Context/Contex';



const Detail = () => {
	const { category, id } = useParams();
	const [isFavorite, setIsFavorite] = useState(false);
	const [context, setContext] = useContext(AuthContext);
	const [item, setItem] = useState(null);
	const [items, setItems] = useState([]);

	useEffect(() => {
		const getDetail = async () => {
			const response = await tmdbApi.detail(category, id, { params: {} });
			console.log(response);
			setItem(response);
			window.scrollTo(0, 0);
		};
		getDetail();
	}, [category, id]);
	
	console.log(item);

	const onFavoriteClick = async () => {
		if(!items.includes(item))
		{
			
			items.push(item)
			console.log(items)
			setContext(items)
		}
	}

	return (
		<>

			{item && (
				<>
					<div
						className='banner'
						style={{
							backgroundImage: `url(${apiConfig.originalImage(
								item.backdrop_path || item.poster_path
							)})`,
						}}
					></div>
					<div className='mb-3 movie-content container'>
						<div className='movie-content__poster'>
							<div
								className='movie-content__poster__img'
								style={{
									backgroundImage: `url(${apiConfig.originalImage(
										item.poster_path || item.backdrop_path
									)})`,
								}}
							></div>
						</div>
						<div className='movie-content__info'>
							<h1 className='title'>{item.title || item.name}</h1>
							<div className='genres'>
								{item.genres &&
									item.genres.slice(0, 5).map((genre, i) => (
										<span key={i} className='genres__item'>
											{genre.name}
										</span>
									))}
							</div>
										<Stack direction='row' spacing={1}>
									<LoadingButton
										variant='text'
										sx={{
											width: 'max-content',
											'& .MuiButon-starIcon': { marginRight: '0' },
										}}
										size='large'
										startIcon={
											isFavorite ? (
												<FavoriteIcon />
											) : (
												<FavoriteBorderOutlinedIcon />
											)
										}
										loadingPosition='start'
										onClick={onFavoriteClick}
									/>
									</Stack>
							<p className='overview'>{item.overview}</p>
							<div className='cast'>
								<div className='section__header'>
									<h2>Актеры</h2>
								</div>
								<CastList id={item.id} />
							</div>
						</div>
					</div>
					<div className='container'>
						<div className='section mb-3'>
							<VideoList id={item.id} />
						</div>
						<div className='section mb-3'>
							<div className='section__header mb-2'>
								<h2>Похожие</h2>
							</div>
							<MovieList category={category} type='similar' id={item.id} />
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Detail;
