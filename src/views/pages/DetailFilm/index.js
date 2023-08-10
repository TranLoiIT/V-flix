/* eslint-disable indent */
import { getAFilmAndRelated } from 'apis/filmApi';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { BiArrowBack } from 'react-icons/bi';
import { SiFacebook } from 'react-icons/si';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FacebookButton } from 'react-social';
import { categoriesSelectors } from 'state/modules/categories';
import { userActions, userSelectors } from 'state/modules/user';
import capitalizeFirstLetter from 'utils/capitalizeFirstLetter';
import { Loading } from 'utils/Loadable';
import FilmListingsByGenre from 'views/components/FilmListingsByGenre';
import List from 'views/components/FilmListingsByGenre/components/List';
import Navbar from 'views/components/Navbar';
import RatingStar from 'views/components/RatingStar';
import ReviewFilm from 'views/components/ReviewFilm';
import './style.scss';

const DetailFilm = () => {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [currentFilm, setCurrentFilm] = useState({});
  const [episode, setEpisode] = useState({});
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrolling, setScrolling] = useState(false);
  const user = useSelector((state) => userSelectors.user(state));
  const isAuthenticated = useSelector((state) =>
    userSelectors.isAuthenticated(state),
  );
  const categories = useSelector((state) =>
    categoriesSelectors.categories(state),
  ).toJS();

  const listenScrollEvent = () => {
    setScrolling(window.scrollY !== 0);
  };

  const handleUpdateHistoryUser = (filmData) => {
    const limitHistory = user.get('history').toJS();
    if (limitHistory.length === 9) {
      limitHistory.pop();
    }

    const filterHistory = limitHistory.filter(
      (item) => item.filmId !== filmData._id,
    );
    dispatch(
      userActions.updateUser({
        id: user.get('_id'),
        dataUser: {
          history: [
            { filmId: filmData._id, date: Date.now() },
            ...filterHistory,
          ],
        },
      }),
    );
  };

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
    const getFilm = async () => {
      const response = await getAFilmAndRelated(slug);
      setCurrentFilm(response.data.film);
      setEpisode(response.data.film.episodes[0])
      if (isAuthenticated) {
        handleUpdateHistoryUser(response.data.film);
      }
      setRelated(response.data.related);
      setLoading(false);
    };
    getFilm();
    return () => {
      window.removeEventListener('scroll', listenScrollEvent);
    };
    // eslint-disable-next-line
  }, [slug]);

  const handleUpdateFilm = (dataUpdate) => {
    setCurrentFilm(dataUpdate);
  };

  console.log('episode', episode)

  return (
    <>
      <Helmet>
        <title>
          {loading ? 'Đang tải phim...' : `${currentFilm.title} - VMOflix`}
        </title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className='detailFilm w-full overflow-hidden'>
            <Navbar
              addClass={`transform ${scrolling ? null : '-translate-y-full'}`}
            />
            <div className='group bg-black '>
              <Link
                to='/'
                type='button'
                className='absolute z-1 bg-transparent text-white text-30 lg:text-50 top-1rem lg:top-5rem left-1rem lg:left-5rem opacity-100 xl:opacity-0 group-hover:opacity-100'
              >
                <BiArrowBack />
              </Link>
              {
                (!loading && episode?.url) && (
                  <ReactPlayer
                    url={episode?.url}
                    controls
                    playing
                    width='100%'
                    height={window.innerWidth >= 1280 ? '100vh' : '56.25vw'}
                  />
                )
              }
            </div>
            <div className='detailFilm__info container mt-10 mx-auto flex mb-6rem flex-wrap'>
              <div className='detailFilm__info-left flex-1 mb-20rem xl:mr-20 mx-4% lg:mx-0'>
                <div className='detailFilm__info-left-top flex items-start mb-16'>
                  <div className='w-1/4 relative mr-10'>
                    <div className='p-film'>
                      <img
                        className='absolute object-cover top-0 left-0 w-full h-full'
                        src={`${process.env.REACT_APP_BASE_API_PREFIX}${currentFilm.poster}`}
                        alt='poster'
                      />
                    </div>
                  </div>
                  <div className='flex-1'>
                    <h2 className='text-20 sm:text-40 font-bold text-white mb-2'>
                      {currentFilm.title}
                    </h2>
                    <div className='flex'>
                      <RatingStar
                        className='detailFilm__info-left-top-star'
                        ratingPercent={
                          currentFilm.reviews.length === 0
                            ? 0
                            : (currentFilm.reviews.reduce(
                                (average, review) => average + review.rating,
                                0,
                              ) /
                                currentFilm.reviews.length /
                                5) *
                              100
                        }
                      />
                      <div className='detailFilm__info-left-top-share '>
                        <FacebookButton
                          url={`https://vmoflix-vn.web.app/${pathname}`}
                          appId='761669164547706'
                          className='flex items-center bg-blue-facebook py-0.25rem px-1rem text-14 text-white ml-10 rounded-md'
                        >
                          <SiFacebook className='mr-2' />
                          Chia sẻ
                        </FacebookButton>
                      </div>
                    </div>
                    <div className='text-16 mb-2 mt-10'>
                      <strong className='text-gray-primary'>Diễn viên:</strong>
                      <span className='capitalize text-white'>
                        {currentFilm.actor
                          ? ` ${capitalizeFirstLetter(
                              currentFilm.actor?.join(', '),
                            )}`
                          : ''}
                      </span>
                    </div>
                    <div className='text-16 mb-10'>
                      <strong className='text-gray-primary'>Thể loại:</strong>
                      <ul className='text-white inline-block'>
                        <>&nbsp;</>
                        {currentFilm.genre
                          ? categories
                              .filter((item) => {
                                for (
                                  let i = 0;
                                  i < currentFilm.genre.length;
                                  i++
                                ) {
                                  if (item.genre === currentFilm.genre[i]) {
                                    return true;
                                  }
                                }
                                return false;
                              })
                              .map((item, index) => (
                                <li className='inline-block' key={item._id}>
                                  {index === 0 ? '' : <>,&nbsp;</>}
                                  <Link
                                    to={`/category?genre=${item.genre}`}
                                    className='hover:underline'
                                  >
                                    {item.vn}
                                  </Link>
                                </li>
                              ))
                          : null}
                      </ul>
                    </div>
                    <strong className='text-16 text-gray-primary'>
                      Nội dung:
                    </strong>
                    <p className='text-16 text-white'>
                      {currentFilm.description}
                    </p>
                  </div>
                </div>
                <div className='mb-16'>
                  <div className='text-20 text-white mb-2'>Danh sách tập phim</div>
                  <div className='grid grid-cols-12 gap-8 mb-6'>
                    {
                      (currentFilm?.episodes || []).map((item, index) => (
                        <div
                          className={
                            `
                            bg-red-primary py-3 px-5 rounded-lg text-center text-16 text-white font-bold 
                            ${item._id === episode?._id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                            `
                          }
                          key={item._id}
                          onClick={() => {
                            if (item._id !== episode?._id) {
                              console.log('item', item)
                              setLoading(true);
                              setTimeout(() => {
                                setEpisode({...item});
                                setLoading(false);
                              }, 1500);
                            }
                          }}
                        >
                          {index + 1}
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className='detailFilm__info-left-bottom'>
                  <ReviewFilm
                    currentFilm={currentFilm}
                    handleUpdateFilm={handleUpdateFilm}
                  />
                </div>
              </div>
              <div className='detailFilm__info-right w-full xl:w-1/4'>
                {window.innerWidth >= 1280 ? (
                  <>
                    <h3 className='text-white text-30 font-bold mb-10'>
                      Phim liên quan
                    </h3>
                    <List
                      numItemPerList={2}
                      margin='25px'
                      films={related}
                      className='flex-wrap'
                      related
                    />
                  </>
                ) : (
                  <FilmListingsByGenre
                    filmsFilter={related}
                    genre='Phim liên quan'
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default React.memo(DetailFilm);
