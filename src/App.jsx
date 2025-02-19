import './App.css'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import conf from './conf/conf';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components';

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData){
      dispatch(login({userData}))
      } else {
        console.log('No user data')
      }
    })
    .finally(() => setLoading(false) )
  })
  
  return !loading ? (
    <div className='min-h-screen w-full flex flex-wrap content-between '> 
      <div className='w-full block'> 
        <Header />
        <main>
        {/* <Outlet /> */}
        </main>
        <Footer />
        </div>
     </div>
  ) : null

  // return (
  //   <>
  //   <h1>
  //     A blog app with appwrite
  //   </h1>
  //   </>
  // )
}

export default App