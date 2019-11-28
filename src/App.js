import React from 'react';
import 'typeface-roboto';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import logo from './logo.svg';
import FolderIcon from "@material-ui/core/SvgIcon/SvgIcon";
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ManageAccount from "./ManageAccount";
import Upload from "./Upload";
import Create from "./Create";
import Download from "./Download";
import History from "./History";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function App() {
    const classes = useStyles();

    return (
        <Router>
      <AppBar position="static">
          <Toolbar>
              <Typography variant="h6" className={classes.title}>
                  AI-Composer
              </Typography>
              <Link to="/">
                  <Button
                      aria-controls="customized-menu"
                      aria-haspopup="true"
                      variant="contained"
                      color="primary"
                  >
                      Home
                  </Button>
              </Link>
              <Link to="/login">
                  <Button
                      aria-controls="customized-menu"
                      aria-haspopup="true"
                      variant="contained"
                      color="primary"
                  >
                      Login
                  </Button>
              </Link>
              <Link to="/register">
                  <Button
                      aria-controls="customized-menu"
                      aria-haspopup="true"
                      variant="contained"
                      color="primary"
                  >
                      Register
                  </Button>
              </Link>
              <Link to="/manage">
                  <Button
                      aria-controls="customized-menu"
                      aria-haspopup="true"
                      variant="contained"
                      color="primary"
                  >
                      Manage
                  </Button>
              </Link>
              <Link to="/create">
                  <Button
                      aria-controls="customized-menu"
                      aria-haspopup="true"
                      variant="contained"
                      color="primary"
                  >
                      Create
                  </Button>
              </Link>
              <Link to="/history">
                  <Button
                      aria-controls="customized-menu"
                      aria-haspopup="true"
                      variant="contained"
                      color="primary"
                  >
                      History
                  </Button>
              </Link>
              <Link to="/upload">
                  <Button
                      aria-controls="customized-menu"
                      aria-haspopup="true"
                      variant="contained"
                      color="primary"
                  >
                      Upload
                  </Button>
              </Link>
          </Toolbar>


      </AppBar>

              <div className="container">
                  <Route exact path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                  <Route path="/manage" component={ManageAccount} />
                  <Route path="/upload" component={Upload} />
                  <Route path="/create" component={Create} />
                  <Route path="/download" component={Download} />
                  <Route path="/history" component={History} />
              </div>
          </Router>
  );
}

export default App;
