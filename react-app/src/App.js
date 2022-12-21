import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import { authenticate } from './store/session';
import './components/stylesheet/app.css'
import LeftBox from './components/AppLeft';
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <div className='main-app'>
      <div className='app-left-container'>
         <LeftBox/>
      </div>
      <div className='app-right-container'>
          <>
            <NavBar />
          </>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
