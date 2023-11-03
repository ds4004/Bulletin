import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Nav from './Components/Nav/Nav';
import PrivateComponent from './Components/PrivateComponent';
import ContentList from './Components/ContentList/ContentList';
import AddContent from './Components/AddContent/AddContent';
import UpdateContent from './Components/UpdateContent/UpdateContent';
import Profile from './Components/Profile/Profile';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            {/* <Route> is an element that renders some components when a current URL matches the route's path. <Link> is an element used to navigate through routes. */}
            <Route path='/' element={<ContentList />} />
            <Route path='/add' element={<AddContent />} />
            <Route path='/update/:id' element={<UpdateContent />} />
            <Route path='/logout' element={<h1>Logout</h1>} />
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
