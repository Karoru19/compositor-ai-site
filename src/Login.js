import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import 'typeface-roboto';


export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailValue: '',
            passwordValue: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(fieldName, event) {
        this.setState({[fieldName]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        return fetch('http://localhost:52070/api/login', {
            method: 'POST',
            mode: 'CORS',
            body: JSON.stringify({
                email:this.state.emailValue,
                password:this.state.passwordValue
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res;
        }).catch(err => err);
    }

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <LoginDiv handleSubmitFunc={this.handleSubmit} handleValueChangeFunc={this.handleChange}/>
            </Container>
        );
    }
}

const LoginDiv = ({handleSubmitFunc, handleValueChangeFunc}) => {
    const classes = useStyles();
    return <div className={classes.paper}>
        <Typography component="h1" variant="h5">
            Sign in
        </Typography>
        <form className={classes.form} noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={event => handleValueChangeFunc("emailValue", event)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={event => handleValueChangeFunc("passwordValue", event)}
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary"/>}
                label="Remember me"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmitFunc}
            >
                Sign In
            </Button>
            <Grid container>
                <Grid item>
                    <Link href="/register" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
            </Grid>
        </form>
    </div>
};


const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));