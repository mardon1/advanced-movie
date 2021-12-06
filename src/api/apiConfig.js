const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: '0384d79635d1f4935f1d3bf7d879758b',
  orginalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
