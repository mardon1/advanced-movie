import React from 'react';
import 'swiper/swiper.min.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './index.scss';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import Routes from './config/Router';

function App() {
  return (
    <Router>
      <Route
        render={(props) => (
          <>
            <Header {...props}></Header>
            <Routes></Routes>
            <Footer></Footer>
          </>
        )}
      ></Route>
    </Router>
  );
}

export default App;
