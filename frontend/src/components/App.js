import { Routes, Route } from 'react-router-dom'
import Home from '../views/Home'
import CreateAd from '../views/CreateAd'
import Create from '../views/Create'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/createad" element={<CreateAd />} />
      <Route path="/create" element={<Create />} />
    </Routes>
  );
}

export default App;
