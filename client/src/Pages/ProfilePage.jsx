import { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import PlacesPageR from './PlacesPageR'
import AccountNav from './AccountNav'


const AccountPage = () => {

  const [redirect,setRedirect]=useState(null)
  const { user, ready, setUser } = useContext(UserContext)
  
  
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }
  
  const logout = async () => {
    await axios.post('/logout')
    setRedirect('/');
    setUser(null);
}


  if (!ready) {
    return 'Loading.....'
  }
  
  if (ready && !user && !redirect) {
  return <Navigate to={'/login'}/>
}

  


 
  
  if (redirect) {
  return <Navigate to={redirect}/>
}


  return (

    <div>
     <AccountNav/>

      {subpage === 'profile' && (
        <div className='text-center max-w-lg mx-auto'>
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className='primary max-w-sm mt-2'>Logout</button>
        </div>
      )}
      {subpage === 'places' && (
        <div>
          <PlacesPageR/>
        </div>
      )}

</div>

    )
}

export default AccountPage