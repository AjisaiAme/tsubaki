import { useState } from 'react';
import './styles/App.css';

import ErrorBoundary from './components/ErrorBoundary.jsx';

import AniListComponent from './components/AniListComponent';
import Header from './components/header';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    
      <Header />
     
      <ErrorBoundary>
        <AniListComponent/>
      </ErrorBoundary>
    </>
  );
}

export default App;
