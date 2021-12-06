import React, { useState, useEffect, useCallback } from 'react';
import './movie-grid.scss';
import Input from '../input/Input';
import MovieCard from '../movie-card/MovieCard';
import { useHistory, useParams } from 'react-router';
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';
import Button, { OutlineButton } from '../button/Button';

const MovieGrid = (props) => {
  const { keyword } = useParams();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const getList = async () => {
      let repononse = null;
      if (keyword === undefined) {
        const params = {};
        switch (props.category) {
          case category.movie:
            repononse = await tmdbApi.getMovieList(movieType.upcoming, {
              params,
            });
            break;
          default:
            repononse = await tmdbApi.getTvList(tvType.popular, {
              params,
            });
        }
      } else {
        const params = {
          query: keyword,
        };
        repononse = await tmdbApi.search(props.category, { params });
      }
      setItems(repononse.results);
      setTotalPage(repononse.total_pages);
    };
    getList();
  }, [props.category, keyword]);

  const loadMore = async () => {
    let repononse = null;
    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };
      switch (props.category) {
        case category.movie:
          repononse = await tmdbApi.getMovieList(movieType.upcoming, {
            params,
          });
          break;
        default:
          repononse = await tmdbApi.getTvList(tvType.popular, {
            params,
          });
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      repononse = await tmdbApi.search(props.category, { params });
    }
    setItems([...items, ...repononse.results]);
    setPage(page + 1);
  };

  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={props.category} keyword={keyword}></MovieSearch>
      </div>
      <div className="movie-grid">
        {items.map((item, i) => {
          return (
            <div>
              <MovieCard categoryy={'birnima'} item={item} key={i}></MovieCard>
            </div>
          );
        })}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};

const MovieSearch = (props) => {
  const history = useHistory();
  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');
  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      history.push(`${category[props.category]}/search/${keyword}`);
    }
  }, [keyword, props.category, history]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if ((e.keyCod = 13)) {
        goToSearch();
      }
    };
    document.addEventListener('keyup', enterEvent);
    return () => {
      document.removeEventListener('keyup', enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      ></Input>
      <Button className="small" onClick={goToSearch}>
        Search
      </Button>
    </div>
  );
};

export default MovieGrid;
