const apiConfig = {
	baseUrl: 'https://api.themoviedb.org/3/',
	apiKey: '9e5d5d0751fe8e138bc238564f933151',
	language: 'ru-RU',
	originalImage: imgPath => `https://image.tmdb.org/t/p/original/${imgPath}`,
	w500Image: imgPath => `https://image.tmdb.org/t/p/w500/${imgPath}`,
	backdropPath: (imgEndpoint) => `https://image.tmdb.org/t/p/original${imgEndpoint}`
};

export default apiConfig;