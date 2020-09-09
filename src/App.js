import React,{Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import logo from './logo.svg';
import './App.css';
import TodoDrawer from "./components/Main/TodoDrawer"
import Login from "./components/Login/Login"
import Signup from "./components/Signup/Signup"
import Landing from "./components/Landing/Landing"
function App() {
  
  const [category,setCategory]= React.useState(['General'])

  React.useEffect(()=>{
   if(!localStorage.getItem("category")==null) setCategory(localStorage.getItem('category'))
   else localStorage.setItem('category', category)
  },[])

  console.log("uu",category)

  return (
    <Router>
        <Fragment>
          <Route exact path="/" component={Landing}></Route>
          <section className="container">
            <Switch >
              <Route exact path="/signup" component={Signup}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/todo" component={TodoDrawer}></Route>
            </Switch>
          </section>

        </Fragment>
      </Router>
  );
}

export default App;
