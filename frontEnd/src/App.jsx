import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//ファイルを使うためのPath設定
import LoginPage from './components/LoginPage';
import TimeCardPage from './components/TimeCardPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/timecard" element={<TimeCardPage />} />
        <Route path="/result" element={<result />} />
      </Routes>
    </Router>
  );
};

export default App;
