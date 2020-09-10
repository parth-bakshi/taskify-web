import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { apiURLs } from "./api_services/urls";
import moment from "moment";
import Push from "push.js";
import axios from "axios";

import logo from "./logo.svg";
import "./App.css";
import TodoDrawer from "./components/Main/TodoDrawer";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Landing from "./components/Landing/Landing";
import Cookies from "js-cookie";

function PrivateRoute({ component: Component, authed, path, ...rest }) {
  console.log("authenprovate", authed);
  return (
    <Route
      exact
      render={(props) =>
        authed === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

function App() {
  const is_login = Cookies.get("is_login");
  const [category, setCategory] = React.useState(["General"]);
  console.log("is_login", !!is_login);
  React.useEffect(() => {
    if (!localStorage.getItem("category") == null)
      setCategory(localStorage.getItem("category"));
    else localStorage.setItem("category", category);
  }, []);

  //settimeout

  setInterval(() => {
    axios
      .get(apiURLs.getTasks(), {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        if (response.data.data) {
          response.data.data.map((task) => {
            const taskDate = moment(task.date, "DD-MM-YYYY HH:mm");
            console.log(taskDate.minute() - moment().minute() === 1);
            if (
              taskDate.date() === moment().date() &&
              taskDate.month() === moment().month() &&
              taskDate.year() === moment().year() &&
              taskDate.hour() === moment().hour() &&
              taskDate.minute() - moment().minute() === 1 &&
              localStorage.getItem("id") !== task._id
            ) {
              localStorage.setItem("id", task._id);
              Push.create(task.name, {
                body: task.description,
                icon: "/icon.png",
                timeout: 6000,
                onClick: function () {
                  window.focus();
                  this.close();
                },
              });
            }
          });
        }
      });
  }, 30000);

  return (
    <Router>
      <Fragment>
        <Route exact path="/" component={Landing}></Route>
        <section className="container">
          <Switch>
            <Route exact path="/signup" component={Signup}></Route>
            <Route
              exact
              path="/login"
              render={(props) => <Login {...props} />}
            ></Route>
            <PrivateRoute
              exact
              path="/todo"
              authed={!!is_login}
              component={TodoDrawer}
            ></PrivateRoute>
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
}

export default App;
