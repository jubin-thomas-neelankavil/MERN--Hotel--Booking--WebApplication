import './App.css'
import {Route, Routes} from 'react-router-dom'
import IndexPages from './Pages/IndexPages'
import LoginPage from './Pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './Pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import ProfilePage from './Pages/ProfilePage'
import PlacesPageR from './Pages/PlacesPageR'
import PlacessFormPage from './Pages/PlacessFormPage'

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true

function App() {

  return (
    <UserContextProvider>
      <Routes>
      <Route path='/' element={<Layout />}>
      <Route index element={<IndexPages />} />
        <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/register"} element={<RegisterPage />} />
          <Route path='/account' element={<ProfilePage />} />
          <Route path='/account/places' element={<PlacesPageR />} />
          <Route path='/account/places/new' element={<PlacessFormPage />} />


      </Route>
</Routes>
</UserContextProvider>
    )
}

export default App
