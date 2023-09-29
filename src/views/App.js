/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
import { createNotificationApi } from 'apis/subscriptionApi';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  categoriesActions,
  categoriesSelectors,
} from 'state/modules/categories';
import { userActions } from 'state/modules/user';
import { Loading } from 'utils/Loadable';
import routers from '../routers';
import * as serviceWorker from '../serviceWorker';
import './App.scss';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Admin from './pages/Admin';
import DetailFilm from './pages/DetailFilm';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => categoriesSelectors.loading(state));

  useEffect(() => {
    dispatch(userActions.loadUser());
    dispatch(categoriesActions.getCategories());
    const pushNotification = async () => {
      try {
        if (serviceWorker.isPushNotificationSupported()) {
          let consent = Notification.permission;
          let userSubscription = await serviceWorker.getUserSubscription();
          if (consent !== 'granted') {
            consent = await serviceWorker.askUserPermission();
          }
          if (consent === 'granted') {
            if (!userSubscription) {
              userSubscription = await serviceWorker.createNotificationSubscription();
              await createNotificationApi(userSubscription);
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    pushNotification();
  }, []);

  const HaveNavbar = () => {
    return (
      <>
        <Helmet>
          <title>VMOflix</title>
        </Helmet>
        <Navbar />
        <Switch>
          {routers.map((route, i) => (
            // eslint-disable-next-line
            <Route exact key={i} {...route} />
          ))}
        </Switch>
      </>
    );
  };

  const HaveFooter = () => {
    return (
      <>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route path='/register' component={Login} />
          <Route path='/forgot-password' component={ForgotPassword} />
          <Route path='/reset-password/:token' component={ForgotPassword} />
          <Route path='/film/:slug' component={DetailFilm} />
          <Route component={HaveNavbar} />
        </Switch>
        <Footer />
      </>
    );
  };

  return (
    <div className='App bg-black-body min-h-screen'>
      <Router>
        <ScrollToTop />
        {loading ? (
          <Loading />
        ) : (
          <Switch>
            <Route path='/admin' component={Admin} />
            <Route component={HaveFooter} />
          </Switch>
        )}
      </Router>
    </div>
  );
};

export default App;
