import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Single from './pages/Single';
import { useEffect } from 'react';

const App: React.FC = () => {
  useEffect(() => {
    document.title = "Hank’s Dashboard";
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col w-full max-w-screen-xl mx-auto md:p-4 p-2">
      <NavBar />
      <main className="flex-grow p-4 md:p-4 sm:p-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/single" element={<Single />} />
          <Route path="/target" element={<div>Target Page (TBD)</div>} />
          <Route path="/dynamic" element={<div>Dynamic Page (TBD)</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;