import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import { authenticate } from './store/session';
import './components/stylesheet/app.css'
import LeftBox from './components/AppLeft';
import UploadSong from './components/AppRight/Upload'; 
import Home from './components/AppRight/Home';
import ProtectedRoute from './components/ProtectedRoute';
import PlaylistPage from './components/AppRight/PlaylistPage';
import UserPage from './components/AppRight/UserPage';
import Footer from './components/Footer';
import NotFound from './components/Notfound';
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticate());
    setLoaded(true);
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <>
            <div className='main-app'>
            <div className='app-left-container'>
               <LeftBox/>
            </div>
            <div className='app-right-container'>
                <>
                  <NavBar />
                  <Home/>
                </>
                <Footer/>
              </div>
             
            </div>
          </>
        </Route>
        <ProtectedRoute path='/upload'>
          <>
            <div className='main-app'>
              <div className='app-left-container'>
              <LeftBox/>
              </div>
              <div className='app-right-container'>
                  <>
                    <NavBar />
                    <UploadSong/>
                </>
                <Footer/>
              </div>
            </div>
            </>
        </ProtectedRoute>
        <ProtectedRoute path='/playlists/:playlistId'>
          <>
            <div className='main-app'>
              <div className='app-left-container'>
               <LeftBox/>
              </div>
              <div className='app-right-container'>
                <>
                  <NavBar />
                  <PlaylistPage/>
                </>
                <Footer/>
              </div>
            </div>
          </>
        </ProtectedRoute>
        <ProtectedRoute path='/profile'>
          <>
            <div className='main-app'>
              <div className='app-left-container'>
              <LeftBox/>
              </div>
              <div className='app-right-container'>
                <>
                <NavBar />
                <UserPage />
                <Footer />
                </>
              </div>
            </div>
          </>
        </ProtectedRoute>
        <Route>
          <>
            <div className='main-app'>
            <div className='app-left-container'>
               <LeftBox/>
            </div>
            <div className='app-right-container'>
                <>
                  <NavBar />
                  <NotFound/>
                </>
                <Footer/>
              </div>
             
            </div>
          </>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
