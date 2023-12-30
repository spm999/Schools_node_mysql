import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddSchool from './pages/AddSchool'
import ShowSchool from './pages/ShowSchool'


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/add-school" element={<AddSchool/>} />
        <Route path="/show-school" element={<ShowSchool />} />
      </Routes>
    </Router>
  )
}

export default App
