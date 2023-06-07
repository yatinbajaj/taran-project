import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './views/Main';
import Detail from './views/Detail';
import Update from './views/Update';
import PetForm from './components/PetForm'; 

function App() { 
  return (
    <div className="App background_image">
      <h1 className='header_font color'>Furry Friends Family Finder</h1>
      <Routes>
            <Route element={<Main/>} path="/" />
            <Route element={<Detail/>} path="/pets/:id" />
            <Route element={<Update/>} path="/pets/:id/edit"/>
            <Route element={<PetForm/>} path="/pets/add/"/>
        </Routes> 
    </div>
  );
}

export default App;
