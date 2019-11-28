import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Input } from '@material-ui/core';
import 'typeface-roboto';
const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
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
    upload:{
        margin: theme.spacing(2.7,0),
    }
}));

export default function Upload() {
    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Upload song from YouTube link
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="link"
                            label="Link"
                            name="link"
                            autoComplete="link"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="tags"
                            label="Tags (comma separated, eg tag1, tag2)"
                            name="tags"
                            autoComplete="tags"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Upload
                        </Button>
                    </form>
                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Upload song from disc
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Button className={classes.upload}
                            fullWidth
                            variant="contained"
                            component="label"
                        >
                            Upload File
                            <input
                                type="file"
                                style={{ display: "none" }}
                            />
                        </Button>

                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="tags"
                            label="Tags (comma separated, eg tag1, tag2)"
                            name="tags"
                            autoComplete="tags"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Upload
                        </Button>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

const theme = {
    spacing: 8,
}