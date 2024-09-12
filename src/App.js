import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import TypingTest from './components/TypingTest';
import Progress from './components/Progress';
import Settings from './components/Settings';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import Register from './components/Register';
// import EditableParagraph from './components/EditableParagraph';
import './styles.css';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const MemoizedTypingTest = React.memo(TypingTest);
  return (
    <AuthProvider>
    <Router>
      <Header />
      <Routes>
        {/* <Route path="/" element={<EditableParagraph />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<MemoizedTypingTest />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
