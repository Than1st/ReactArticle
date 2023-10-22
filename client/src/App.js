import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Sidebar} from "./components/Sidebar";
import {Article} from "./components/Article";
import {DetailArticle} from "./components/DetailArticle";
import {PostArticle} from "./components/PostArticle";
import {ContactUs} from "./components/ContactUs";
import {Login} from "./components/Login";
import {Register} from "./components/Register";
import {Profile} from "./components/Profile";
import {About} from "./components/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Sidebar />}>
            <Route index element={<Article />}/>
            <Route path='/article/:id' element={<DetailArticle />}/>
            <Route path='/post' element={<PostArticle />}/>
            <Route path='/contact-us' element={<ContactUs />}/>
            <Route path='/about/:id' element={<About />}/>
            <Route path='/profile' element={<Profile />}/>
        </Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
