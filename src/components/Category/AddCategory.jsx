import React,{Fragment, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';



export default function AddCategory({open,onClose,handleSubmitCategory}) {
  const [category,setCategory]= React.useState("");

   const handleCategory=(e)=>{
    let data= e.target.value
    setCategory(data)
    console.log("DA",data)
  }
  const handleSubmit = ()=>{
    handleSubmitCategory(category);
    onClose();
 
  }
  return (
    <Fragment>
     <Dialog open={open}  onClose={onClose} fullWidth maxWidth="sm" aria-labelledby="add-todo-title">
        <DialogTitle id="add-category">Add Category</DialogTitle>
        <DialogContent>
       
            <TextField
                autoFocus
                margin="dense"
                name="addCategory"
                type="text"
                onChange={handleCategory}
                fullWidth
            />
        
        
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
