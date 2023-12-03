/* eslint-disable func-names */
/* eslint-disable react/no-array-index-key */
import { getFilmsFilterApi, getFilmsRecentApi } from 'apis/filmApi';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { userSelectors } from 'state/modules/user';
import { Loading } from 'utils/Loadable';
import Banner from 'views/components/Banner';
import FilmListingsByGenre from 'views/components/FilmListingsByGenre';
import './style.scss';
import { getCategoriesApi } from 'apis/categoryApi';

const HomePage = (props) => {
  const [data, setData] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listCategory, setListCategory] = useState([])
  const isAuthenticated = useSelector((state) =>
    userSelectors.isAuthenticated(state),
  );
  // const user = useSelector((state) => userSelectors.user(state));

  const getDataCate = async () => {
    try {
      setLoading(true);
      const responseAll = await getCategoriesApi();
      const convertData = responseAll.data.map((item) => ({ id: item._id, genre: item.genre }));
      // console.log(convertData);
      setListCategory([
        { genre: 'all' },
        ...convertData,
      ]);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataCate();
  }, []);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const responseAll = await getFilmsFilterApi('');
        setData(responseAll.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    (async function () {
      if (isAuthenticated) {
        try {
          const responseAll = await getFilmsRecentApi();
          setRecent(responseAll.data);
        } catch (error) {
          console.log(error);
        }
      }
    })();
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <>
      <Helmet>
        <title>VMOflix</title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className='home pb-20'>
            <Banner films={data} />
            <div className='filmListingsByGenre__wrap -mt-8rem md:-mt-14rem 2xl:-mt-30rem'>
              {isAuthenticated ? (
                <FilmListingsByGenre filmsFilter={recent} genre='recent' />
              ) : null}
              {listCategory.map((item, index) => {
                return (
                  <FilmListingsByGenre
                    filmsFilter={data.filter((film) => {
                      if (item.genre === 'all') {
                        return true;
                      }
                      return film.genre.indexOf(item.genre) !== -1;
                    })}
                    genre={item.genre}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
