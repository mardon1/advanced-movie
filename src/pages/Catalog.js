import React from 'react';

import { useParams } from 'react-router';
import PageHeader from '../components/page-header/PageHeader';
import { category as cate } from '../api/tmdbApi';
import MovieGrid from '../components/movie-grid/MovieGrid';

const Catalog = () => {
  const { category } = useParams();
  return (
    <div>
      <PageHeader>{category === cate.tv ? 'Tv Series' : ' Movies'}</PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={category}></MovieGrid>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
