import React from 'react';

import './movie-card.scss';

import { Link } from 'react-router-dom';

import Button from '../button/Button';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import { Stack} from '@mui/material';
import CircularRate from '../CircularRate';

const MovieCard = props => {

    const item  = props.item;

    const link = '/' + category[props.category] + '/' + item.id;

    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
    
  
    return (
			<Link to={link}>
				<div className='movie-card' style={{ backgroundImage: `url(${bg})` }}>
					<Button>
						<i className='bx bx-play'>{<PlayArrowIcon  />}</i>
					</Button>
					<Stack sx={{marginBottom:'10px'}} spacing={{ xs: 1, md: 2 }}>
						{item.vote_average && <CircularRate value={item.vote_average} />}
					</Stack>
				</div>
				<h3>{item.title || item.name}</h3>
			</Link>
		);
}

export default MovieCard;
