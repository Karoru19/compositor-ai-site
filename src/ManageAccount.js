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

export default class ManageAccount extends Component {

    state = {
        emailValue: '',
        passwordValue: '',
        repasswordValue: '',
        newPasswordValue: ''
    };

    handleChange = (fieldName, event) => {
        this.setState({[fieldName]: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.passwordValue !== this.state.repasswordValue) {
            alert('Type correct password');
            this.setState({passwordValue: ''});
            this.setState({repasswordValue: ''});
            this.setState({newPasswordValue: ''});
        }

        fetch('http://localhost:52070/api/password-change', {
            method: 'POST',
                body: JSON.stringify({
                password: this.state.newPasswordValue,
                confirm_password: this.state.repasswordValue
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
                <ManageDiv repassword={this.state.repasswordValue}
                           email={this.state.emailValue}
                           currentPassword={this.state.passwordValue}
                           newpassword={this.state.newPasswordValue}
                           handleSubmitFunc={this.handleSubmit}
                           handleValueChangeFunc={this.handleChange}
                />
            </Container>
        );
    }
}

const ManageDiv = ({handleSubmitFunc, handleValueChangeFunc, email, currentPassword, newpassword, repassword}) => {
    const classes = useStyles();
    return <div className={classes.paper}>
        <Typography component="h1" variant="h5">
            Manage your account
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
                        onChange={event => handleValueChangeFunc("emailValue", event)}
                        autoComplete="email"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="currentpassword"
                        label="Current Password"
                        type="password"
                        id="currentpassword"
                        value={currentPassword}
                        onChange={event => handleValueChangeFunc("passwordValue", event)}
                        autoComplete="current-password"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="newpassword"
                        label="New Password"
                        type="password"
                        id="newpassword"
                        value={newpassword}
                        onChange={event => handleValueChangeFunc("newPasswordValue", event)}
                        autoComplete="new-password"
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
                        onChange={event => handleValueChangeFunc("repasswordValue", event)}
                        autoComplete="confirm-password"
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
                Save
            </Button>
        </form>
    </div>
}