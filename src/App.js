import { Routes, Route } from 'react-router-dom';
import './App.css';

// Import Pages
import { Home, SignUp } from './pages';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
      </Routes>
    </div>
  );
}

export default App;