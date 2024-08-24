
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useState } from 'react';
import RefreshHandler from './RefreshHandler';
import Forgotpassword from './pages/Forgotpassword';
import Resetpassword from './pages/Resetpassword';
import Dashboard from './pages/Dashboard';
import Navbar from './pages/Navbar';
import Profile from './pages/Profile';
function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to='/navbar' />
  }

  return (
    <div className='App'>
      <RefreshHandler setAuthenticated={setAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to='/navbar' />} />
        <Route path='/navbar' element={<Navbar />} />
        {/* <Route path='/dashboard' element={<PrivateRoute element={<Dashboard />} />} /> */}
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgotpassword' element={<Forgotpassword />} />
        <Route path='/resetpassword/:token' element={<Resetpassword />} />


        {/* <Route path='/profile' element={<Profile />} /> */}

      </Routes>
    </div>
  );
}

export default App;
