import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodoDrawer from "./components/Main/TodoDrawer"
import FormDialog from "./components/Dialog/Dialog"
function App() {
  return (
    <div className="App">
     <TodoDrawer />
     <FormDialog />
    </div>
  );
}

export default App;
