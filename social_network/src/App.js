import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import PasswordReset from './components/PasswordReset'
import Posts from './components/Posts'
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/signup' element={<SignUp />}/>
       
        <Route exact path="/posts" element={<Posts/>}/>
      </Routes>
    </div>
  );
}

export default App;
