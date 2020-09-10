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
import moment, { isMoment } from 'moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import axios from "axios";
import { apiURLs } from "../../api_services/urls";
import Cookies from "js-cookie";

export default function AddTodo({open,onClose,addTask,categories}) {
  const [category,setCategory]= React.useState("category");
  const [selectedDate, setSelectedDate] = React.useState(moment(Date()).format("YYYY-MM-DD"));
  const [priority,setPriority] = React.useState("");
  const [todoItem,setTodoItem] = React.useState("");
  const [time,setTime] =React.useState('');
  const [description,setDescription]= React.useState('')
  const formData= {  
      "name" :'',
        "priority" : "",
        "category":"",
        "date":"",
        "time":'',
        "description":""
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
    let date= moment(e.target.value).format("YYYY-MM-DD");
    setSelectedDate(date);

  };

  const handleChange = (e)=>{
    setCategory(e.target.value)

  }

  const handleTimeChange =(e)=>{
    setTime(e.target.value)
  }

  const handleDescription =(e)=>{
    setDescription(e.target.value)
  }

  const handleSubmit = ()=>{
      
    let data =  {
        name :todoItem,
        priority : priority,
        category:category,
        date:selectedDate,
        time:time,
        description:description
    }
    
    setTodoForm({ 
     ...data
    });
    const params = JSON.stringify({
      ...data
    });
    axios
      .post(apiURLs.createTask(),params, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "content-type": "application/json",
        },
      })
      .then((res) => {
        if(res.status==200){
          console.log("balle");
          addTask(res.data.data)
        }
        console.log(res);
        // console.log(res);
    });
    
    // console.log(data)
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
                  
                  {categories.map(function(currValue){
                    return <MenuItem value={currValue}> {currValue} </MenuItem>
                  })}
                  {/* <MenuItem value={"category"}>Select Category</MenuItem>
                  <MenuItem value={'private'}>private</MenuItem>
                  <MenuItem value={'work'}>work</MenuItem>
                  <MenuItem value={'shopping'}>shopping</MenuItem> */}
                </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField
                id="date"
                label="Date"
                type="date"
                defaultValue={moment(Date()).format("YYYY-MM-DD")}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e)=>{
                  setTime(e.target.value)
                }}
                />
            </Grid>

            <Grid item xs={12} sm={6}>
            <TextField
                id="time"
                label="Notify"
                type="time"
                defaultValue="07:30"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                onChange={handleTimeChange}

              />
            </Grid>

            <Grid item xs={12} sm={6}>
            <TextField
                autoFocus
                margin="dense"
                name ="description"
                label="Description"
                type="text"
                onChange={handleDescription}
                fullWidth
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
