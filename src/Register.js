import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import 'typeface-roboto';

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default class Register extends Component {


    constructor(props) {
        super(props);
        this.state = {
            emailValue: '',
            passwordValue: '',
            repasswordValue: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(fieldName, event) {
        this.setState({[fieldName]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.passwordValue !== this.state.repasswordValue){
            alert('Type correct password');
            this.setState({passwordValue:''});
            this.setState({repasswordValue:''});
        }

        fetch('http://127.0.0.1:8000/api/register/', {
            method: 'POST',
            body: JSON.stringify({
                username:this.state.emailValue,
                password:this.state.passwordValue
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.ok){
                this.props.history.push('/login');
            }
        }).catch(err => err);
    }

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <RegisterDiv handleSubmitFunc={this.handleSubmit}
                             handleValueChangeFunc={this.handleChange}
                             password={this.state.passwordValue}
                             email={this.state.emailValue}
                             repassword={this.state.repasswordValue}
                />
            </Container>
        );
    }
}

const RegisterDiv = ({handleSubmitFunc, handleValueChangeFunc, email, password, repassword}) => {
    const classes = useStyles();
    return <div className={classes.paper}>
        <Typography component="h1" variant="h5">
            Sign up
        </Typography>
        <form className={classes.form} noValidate>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={email}
                        autoComplete="email"
                        onChange={event => handleValueChangeFunc("emailValue", event)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        autoComplete="current-password"
                        onChange={event => handleValueChangeFunc("passwordValue", event)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="repassword"
                        label="Confirm Password"
                        type="password"
                        id="repassword"
                        value={repassword}
                        autoComplete="current-password"
                        onChange={event => handleValueChangeFunc("repasswordValue", event)}
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmitFunc}
            >
                Sign Up
            </Button>
            <Grid container justify="flex-end">
                <Grid item>
                    <Link href="/login" variant="body2">
                        Already have an account? Sign in
                    </Link>
                </Grid>
            </Grid>
        </form>
    </div>
}