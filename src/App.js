import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodoDrawer from "./components/Main/TodoDrawer"

function App() {
  
  const [category,setCategory]= React.useState(['General'])

  React.useEffect(()=>{
   if(!localStorage.getItem("category")==null) setCategory(localStorage.getItem('category'))
   else localStorage.setItem('category', category)
  },[])

  console.log("uu",category)

  return (
    <div className="App">
      {category ?    <TodoDrawer /> : <h1>hello</h1>  }
  
    </div>
  );
}

export default App;
