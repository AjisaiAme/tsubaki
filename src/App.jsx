import { useState } from 'react';
import './styles/App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary.jsx';

import LandingPage from './pages/landingPage.jsx';

import AniListComponent from './components/AniListComponent';
import Header from './components/header';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Router>
      <Header />

      <ErrorBoundary>
        <Routes>
          {/* Landing */}
          <Route path="/" element={
            //<LandingPage/>
            <LandingPage/>
          }/>
           <Route path="/anilist" element={
            <AniListComponent/>
          }/>
        </Routes>
      </ErrorBoundary>
    </Router>
     
    </>
  );
}

export default App;
