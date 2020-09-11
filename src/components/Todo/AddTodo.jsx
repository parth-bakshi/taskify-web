import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import moment, { isMoment } from "moment";

import axios from "axios";
import { apiURLs } from "../../api_services/urls";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";

export default function AddTodo({ open, onClose, addTask, categories }) {
  const [category, setCategory] = React.useState("category");
  const [todoItem, setTodoItem] = React.useState("");
  const [dateTime, setDateTime] = React.useState();
  const [description, setDescription] = React.useState("");
  const formData = {
    name: "",
    category: "",
    date: "",
    description: "",
  };
  const [todoForm, setTodoForm] = React.useState({
    ...formData,
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleTodoItem = (e) => {
    setTodoItem(e.target.value);
  };

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleTimeChange = (e) => {
    setDateTime(moment(e.target.value).format("DD-MM-YYYY HH:mm"));
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = () => {
    if (!todoItem)
      return enqueueSnackbar("Please Add Todo Item Name", { variant: "info" });
    if (!dateTime)
      return enqueueSnackbar("Please Select Date and Time to Notify", {
        variant: "info",
      });
    if (category === "category")
      return enqueueSnackbar("Please Select Category", { variant: "info" });
    if (!description)
      return enqueueSnackbar("Please Add Todo Item Description", {
        variant: "info",
      });

    let data = {
      name: todoItem,
      category: category,
      date: dateTime,
      description: description,
    };

    setTodoForm({
      ...data,
    });
    const params = JSON.stringify({
      ...data,
    });
    axios
      .post(apiURLs.createTask(), params, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "content-type": "application/json",
        },
      })
      .then((res) => {
        if (res.status == 200) {
          addTask(res.data.data);
          enqueueSnackbar("Todo Added Successfully", { variant: "success" });
        }
        console.log(res);
        // console.log(res);
      })
      .catch((e) => {
        enqueueSnackbar("Failed to Add Todo", { variant: "error" });
      });

    // console.log(data)
    onClose();
  };
  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        aria-labelledby="add-todo-title"
      >
        <DialogTitle id="add-todo-title">Add Your Todo</DialogTitle>

        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoFocus
                margin="dense"
                name="todoField"
                label="Todo Item Name"
                type="text"
                onChange={handleTodoItem}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="time"
                label="Notify Me"
                type="datetime-local"
                defaultValue={moment(Date()).format("YYYY-MM-DDTHH:mm")}
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
              <InputLabel id="categorySelect">Category</InputLabel>
              <Select
                labelId="categorySelect"
                id="CategorySelect"
                value={category}
                name="category"
                onChange={handleChange}
              >
                <MenuItem value={"category"}>Select Category</MenuItem>
                {categories.map(function (currValue) {
                  return <MenuItem value={currValue}> {currValue} </MenuItem>;
                })}
              </Select>
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                autoFocus
                margin="dense"
                name="description"
                label="Description"
                type="text"
                onChange={handleDescription}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleSubmit} variant={"contained"} color="primary">
            Add Todo
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
