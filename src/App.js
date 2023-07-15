import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import List from './Components/List';
import Favourites from './Components/Favourites';
import {BrowserRouter,Route,Routes} from 'react-router-dom'

function App() {
  return (
  
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route 
      path="/" 
      element={
      <>
        <Banner/>
        <List/>
      </>
      }
      />
      <Route path="/fav" element={<Favourites/>}/>

    </Routes>
    </BrowserRouter> 
  );
}

export default App;
