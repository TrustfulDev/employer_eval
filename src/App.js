import { Routes, Route } from 'react-router-dom';
import { Navbar } from "./components"

// Import Pages
import { Home, SignUp, Login, Account, SearchPage, CreateEmployer } from './pages';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/search' element={<SearchPage />}></Route>
        <Route path='/account' element={<Account />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/create' element={<CreateEmployer />}></Route>
      </Routes>
    </div>
  );
}

export default App;