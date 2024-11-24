import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import DeleteUsers from './Components/DeleteUsers';
import AddUsers from './Components/AddUsers';
import EditUsers from './Components/EditUsers';
import LogPage from './Pages/log';
import UsersList from './Components/UsersList'
import SADashboard from './Pages/SADashboard';
import ADashboard from './Pages/ADashboard';
import UDashboard from './Pages/UDashoard';
import Search from './Pages/Search';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogPage />} />
          <Route path="/sadashboard" element={<SADashboard />} />
          <Route path="/adashboard" element={<ADashboard />} />
          <Route path="/udashboard" element={<UDashboard />} />
          <Route path='/search' element={<Search/>}/>
          
          //Un wanted routes
          <Route path="/delete" element={<DeleteUsers />} />
          <Route path="/register" element={<AddUsers />} />
          <Route path="/edit" element={<EditUsers />} />
          <Route path="/users" element={<UsersList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
