import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import { Box, Grid} from '@mui/material';
import { useContext, useState } from 'react';

import '../pages/detail/detail.scss';

import Container from '../components/Container/Container';
import uiConfigs from '../config/ui.configs';
import { AuthContext } from '../components/Context/Contex';

import apiConfig from '../api/apiConfig';

const FavoriteItem = ({ item, onRemoved }) => {
	const onRemov = async () => {	
		onRemoved(item.id);
	};

	return (
		<>
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
			</div>
			<LoadingButton
				fullWidth
				variant='contained'
				sx={{ marginTop: 2 }}
				startIcon={<DeleteIcon />}
				loadingPosition='start'
				onClick={onRemov}
			>
				remove
			</LoadingButton>
		</>
	);
};
const FavoriteList = () => {
	const [context, setContext] = useContext(AuthContext);
	const [count, setCount] = useState('');
	const onRemoved = id => {
		const newMedias = [...context].filter(e => e.id !== id);
		setContext(newMedias);
		setCount(count - 1);
	};

	return (
		<Box sx={{ ...uiConfigs.style.mainContent,color:'white', maxWidth: '1900px'}}>
			<Container header={`Список избранное ${count}`} >
				<Grid  container spacing={1} sx={{ marginRight: '-15px!important' }}>
					{context.map((item, i) => (
						<Grid item xs={6} sm={4} md={3} key={i}>
							<FavoriteItem item={item} onRemoved={onRemoved} />
						</Grid>
					))}
					;
				</Grid>
			</Container>
		</Box>
	);
};

export default FavoriteList;
