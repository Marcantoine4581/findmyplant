import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from '../views/Home'
import CreateAd from '../views/CreateAd'
import Create from '../views/Create'
import Login from '../views/Login'
import Signup from '../views/Register'
import AuthenticatedRoute from './AuthenticatedRoute'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createad" element={
            <AuthenticatedRoute>
              <CreateAd />
            </AuthenticatedRoute>
          } />
          <Route path="/create" element={<Create />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
