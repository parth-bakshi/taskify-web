import React,{Fragment} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';


export default function AddTodo({open,onClose}) {
  const [category,setCategory]= React.useState("category");
  const [selectedDate, setSelectedDate] = React.useState(new Date('2020-12-30T21:11:54'));
  const [priority,setPriority] = React.useState("");
  const [todoItem,setTodoItem] = React.useState("");
  const formData= {  
      "todoItem" :'',
        "priority" : "",
        "category":"",
        "date":""
    } 
  const [todoForm,setTodoForm] =React.useState({
     ...formData
  })


  const handleTodoItem = (e) => {
    setTodoItem(e.target.value);  
};

  
  const handlePriority = (e) => {
    setPriority(e.target.value);


  };
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);

  };

  const handleChange = (e)=>{
    setCategory(e.target.value)

  }

  const handleSubmit = ()=>{
      
    let data =  {
        todoItem :todoItem,
        priority : priority,
        category:category,
        date:selectedDate
    }
    
    setTodoForm({ 
     ...data
    });

    onClose();
  
  }
  return (
    <Fragment>
     <Dialog open={open}  onClose={onClose} fullWidth maxWidth="sm" aria-labelledby="add-todo-title">
        <DialogTitle id="add-todo-title">Add Todo</DialogTitle>

        <DialogContent>
            <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
            <TextField
                autoFocus
                margin="dense"
                name="todoField"
                label="Todo Item"
                type="text"
                onChange={handleTodoItem}
                fullWidth
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                autoFocus
                margin="dense"
                name ="priority"
                label="Priority"
                type="text"
                onChange={handlePriority}

                fullWidth
            />
            </Grid>
        
            <Grid item xs={12} sm={6}>
                <InputLabel id="categorySelect">Category</InputLabel>
                <Select
                labelId="categorySelect"
                id="CategorySelect"
                value={category}
                name="category"
                onChange={handleChange}
                
                >
                <MenuItem value={"category"}>category</MenuItem>
                <MenuItem value={'private'}>private</MenuItem>
                <MenuItem value={'work'}>work</MenuItem>
                <MenuItem value={'shopping'}>shopping</MenuItem>
                </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField
                id="date"
                label="Date"
                type="date"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={handleDateChange}
                />
            </Grid>

        </Grid>
        
        </DialogContent>

        <DialogActions>
       
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
