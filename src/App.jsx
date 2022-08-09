import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import ProductDetail from './pages/ProductDetail'
import Home from './pages/Home'
import Login from './pages/Login'
import Purchases from './pages/Purchases'
import NavBar from './components/NavBar'
import "bootswatch/dist/litera/bootstrap.min.css";
import LoadingScreen from './components/LoadingScreen'
import { useSelector } from 'react-redux/es/exports'
import ProtectedRoutes from './components/ProtectedRoutes'




function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <div className="App">
     <HashRouter>
      <NavBar />
      {isLoading && <LoadingScreen />}
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/detail/:id' element={<ProductDetail/>} />
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoutes/>}>
            <Route path='/purchases' element={<Purchases />} />
          </Route>
      </Routes>
     </HashRouter>
    </div>
  )
}

export default App
