// Import Routes and Components
import { Routes, Route } from 'react-router-dom';
import { Navbar } from "./components"

// Import Pages
import { Home, SignUp, Login, Account, SearchPage, CreateEmployer, Employer, WriteReview} from './pages';

/* The main functional component that is rendered into the virtual DOM
* Here, Routes are set up to determine which page is shown on the screen depending on the URL
* The Navbar component is added before the Routes so that it shows up in every single route
*/
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
        <Route path='/employer' element={<Employer />}></Route>
        <Route path='/write' element={<WriteReview />}></Route>
      </Routes>
    </div>
  );
}

export default App;