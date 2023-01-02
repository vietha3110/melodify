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
              </div>
            </div>
            <Footer/>
          </>
        </Route>
        <ProtectedRoute path='/upload'>
          <div className='main-app'>
            <div className='app-left-container'>
             <LeftBox/>
            </div>
          <div className='app-right-container'>
              <>
                <NavBar />
                <UploadSong/>
              </>
            </div>
          </div>
        </ProtectedRoute>
        <ProtectedRoute path='/playlists/:playlistId'>
          <div className='main-app'>
            <div className='app-left-container'>
             <LeftBox/>
            </div>
            <div className='app-right-container'>
              <>
                <NavBar />
                <PlaylistPage/>
              </>
            </div>
          </div>
        </ProtectedRoute>
        <ProtectedRoute path='/profile'>
          <div className='main-app'>
            <div className='app-left-container'>
             <LeftBox/>
            </div>
            <div className='app-right-container'>
              <UserPage/>
            </div>
          </div>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
