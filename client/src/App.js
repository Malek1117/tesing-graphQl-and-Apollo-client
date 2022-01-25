import './App.css';
import { Routes,Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    </div>
  );
}

export default App;