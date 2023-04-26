/* eslint-disable indent */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { categoriesSelectors } from 'state/modules/categories';
import { Loading } from 'utils/Loadable';
import responsive from 'utils/responsive';
import List from 'views/components/FilmListingsByGenre/components/List';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchFilms = () => {
  const query = useQuery();
  const { search, pathname } = useLocation();
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { numItemPerList, margin } = responsive();
  const categories = useSelector((state) =>
    categoriesSelectors.categories(state),
  ).toJS();

  useEffect(() => {
    const getFilms = async () => {
      setLoading(true);
      const response = await axios.get(`/api/films/${`filter${search}`}`, {
        withCredentials: true,
      });
      setFilms(response.data);
      setLoading(false);
    };
    getFilms();
    // eslint-disable-next-line
  }, [search]);

  const handleDeleteFilm = (idFilm) => {
    setRelated(related.filter((film) => film._id !== idFilm));
    deleteFilmApi(idFilm);
  };

  return (
    <div className='searchFilms mb-10rem'>
      <Helmet>
        <title>VMOflix - Bộ lọc</title>
      </Helmet>
      <div className='w-100 h-12rem sm:h-16rem lg:h-20rem flex items-center justify-center'>
        <h2 className='text-20 sm:text-30 lg:text-40 text-white uppercase font-bold text-center'>
          {pathname === '/search'
            ? `Kết quả tìm kiếm: ${query.get('q')}`
            : `Thể loại: ${
                categories.find((genre) => genre.genre === query.get('genre'))
                  .vn
              }`}
        </h2>
      </div>
      {loading ? (
        <Loading />
      ) : films.length === 0 ? (
        <div className='mt-10 flex justify-center text-20 sm:text-30 text-white'>
          <span>Không có kết quả</span>
        </div>
      ) : (
        <div className='mx-4%'>
          <List
            numItemPerList={numItemPerList}
            margin={margin}
            films={films}
            handleDeleteFilm={handleDeleteFilm}
            className='flex-wrap'
            related
          />
        </div>
      )}
    </div>
  );
};

export default SearchFilms;
