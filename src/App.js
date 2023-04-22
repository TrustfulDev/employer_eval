import { Routes, Route } from 'react-router-dom';
import { Navbar } from "./components"
// Import Pages
import { Home, SignUp, SearchPage } from './pages';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/search' element={<SearchPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;