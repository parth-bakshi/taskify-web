import React,{Fragment} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';


export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [category,setCategory]= React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const handleOpen = () => {
    setOpen(true);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Todo
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" aria-labelledby="form-dialog-title">
        <DialogContent>
        <Grid container spacing={3}>

        <Grid item xs={12} sm={6}>
          <TextField
            autoFocus
            margin="dense"
            name="textField"
            label="Todo Item"
            type="text"
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
            fullWidth
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
        <InputLabel id="categorySelect">Category</InputLabel>
        <Select
          labelId="categorySelect"
          id="categorySelect"
          value={category}
          name="category"
          // open={open}
          // onClose={handleClose}
          onOpen={handleOpen}
          // onChange={handleChange}
         
        >
           <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'private'}>private</MenuItem>
          <MenuItem value={'work'}>work</MenuItem>
          <MenuItem value={'shopping'}>shopping</MenuItem>
        </Select>
        <FormHelperText>Choose category</FormHelperText>

        </Grid>

        <Grid item xs={12} sm={6}>
        <TextField
    id="date"
    label="Date"
    type="date"
    // defaultValue={Date()}
    InputLabelProps={{
      shrink: true,
    }}
  />
                </Grid>

        </Grid>
        
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
