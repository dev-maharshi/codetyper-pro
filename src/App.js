import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import TypingTest from './components/TypingTest';
import Progress from './components/Progress';
// import Settings from './components/Settings';
import Login from './components/Login';
import Register from './components/Register';
import './styles.css';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const MemoizedTypingTest = React.memo(TypingTest);
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>

          <Route path="/" element={<MemoizedTypingTest />} />
          <Route path="/progress" element={<Progress />} />
          {/* <Route path="/settings" element={<Settings />} /> */}
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
