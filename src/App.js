import { Routes, Route } from 'react-router-dom';

// Import Pages
import { Home, SignUp, SearchPage, Login } from './pages';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/search' element={<SearchPage />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;