import './App.css';
import AppContext from './context/AppContext';
import { Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home';
import ProductPage from './pages/ProductPage/ProductPage';

function App() {
  const url = 'http://localhost:4000/api'
  return (
    <AppContext.Provider value = {{url}}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductPage />} />
        </Routes>
    </AppContext.Provider>
  );
}

export default App;
