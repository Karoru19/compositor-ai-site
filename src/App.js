import React, {Component} from 'react';
import 'typeface-roboto';
import {createMuiTheme, MuiThemeProvider, makeStyles} from '@material-ui/core/styles';
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
    Link,
    withRouter
} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ManageAccount from "./ManageAccount";
import Upload from "./Upload";
import Create from "./Create";
import Download from "./Download";
import History from "./History";
import Logout from "./Logout";
import MainPage from "./MainPage";

const colortheme = createMuiTheme({
    palette: {
        primary: { main: "#fff", contrastText: "#03a9f4" },
        secondary: { main: "#03a9f4", contrastText: "#fff" },
    }
});

const useStyles = makeStyles(theme => ({
    root: {
        textdecoration:'none',
        '& > *': {
            margin: theme.spacing(1),
        },
        flexGrow: 1,
        backgroundColor: 'transparent'
    },
    menuButton: {
        textDecoration:'none',
        marginRight: theme.spacing(5),
        textcolor: '#fff'
    },
    title: {
        flexGrow: 1,
    },
    bar:{
    }
}));


export default class App extends Component {

    state = {
        refresh: '',
    };

    refresh = () => {
        this.setState({refresh: 'yes'});
    };

    logOut = () => {
        sessionStorage.clear();
        this.setState({refresh: 'yes'});
    };

    render() {
        return (
            <AppDiv logOut={this.logOut} refresh={this.refresh}/>
        )
    };
}


const AppDiv = ({refresh, logOut}) => {
    const classes = useStyles();

    return (
        <Router>
            <MuiThemeProvider theme={colortheme}>
            <AppBar position="static" className={classes.root}>
                <Toolbar style={{textDecoration:'none'}}>
                    <Typography variant="h6" className={classes.title}>
                        <Link to={"/mainpage"} style={{ textDecoration: 'none', color:'#fff' }}>
                            Chill Music Generator
                        </Link>
                    </Typography>

                    {sessionStorage.getItem('token') == null &&
                    <Link to="/login"  className={classes.menuButton}>
                        <Button
                            aria-controls="customized-menu"
                            aria-haspopup="true"
                            color="primary"
                        >
                            Login
                        </Button>
                    </Link>
                    }
                    {sessionStorage.getItem('token') == null &&
                    <Link to="/register" className={classes.menuButton}>
                        <Button
                            aria-controls="customized-menu"
                            aria-haspopup="true"
                            color="primary"
                        >
                            Register
                        </Button>
                    </Link>
                    }
                    {sessionStorage.getItem('token') != null &&
                    <Link to="/manage" className={classes.menuButton}>
                        <Button
                            aria-controls="customized-menu"
                            aria-haspopup="true"
                            color="primary"
                        >
                            Manage
                        </Button>
                    </Link>
                    }
                    {sessionStorage.getItem('token') != null &&
                    <Link to="/create" className={classes.menuButton}>
                        <Button
                            aria-controls="customized-menu"
                            aria-haspopup="true"
                            color="primary"
                        >
                            Create
                        </Button>
                    </Link>
                    }
                    {sessionStorage.getItem('token') != null &&
                    <Link to="/history" className={classes.menuButton}>
                        <Button
                            aria-controls="customized-menu"
                            aria-haspopup="true"
                            color="primary"
                        >
                            History
                        </Button>
                    </Link>
                    }

                    {sessionStorage.getItem('token') != null &&
                    <Link to={"/logout"} className={classes.menuButton}>
                        <Button
                            aria-controls="customized-menu"
                            aria-haspopup="true"
                            variant="text"
                            color="primary"
                            onClick={logOut}
                        >
                            Logout
                        </Button>
                    </Link>
                    }
                </Toolbar>


            </AppBar>

            <div className="container">
                <Route path="/mainpage" component={MainPage}/>
                <Route path="/login" render={(routeProps) => <Login isAuthed={refresh} {...routeProps}/>}/>
                <Route path="/register" component={Register}/>
                <Route path="/manage" component={ManageAccount}/>
                <Route path="/create" component={Create}/>
                <Route path="/download" component={Download}/>
                <Route path="/history" component={History}/>
                <Route path="/logout" component={Logout}/>
            </div>
            </MuiThemeProvider>
        </Router>
    );
};
