import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import CircularProgress from '@material-ui/core/CircularProgress';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';
import PauseIcon from '@material-ui/icons/PauseCircleFilled';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import { Link } from "@material-ui/core";


const rand = Math.floor(Math.random() * 30) + 1 ;
const fileName = "Video/" + rand + ".mp4";

export default function Download() {
    const videoRef = React.createRef(null);
    console.log()
    const audio = new Audio(sessionStorage.getItem('compositionUrl')).play();
    const classes = useStyles();

    function downloadHandler() {

        var FileSaver = require('file-saver');
        FileSaver.saveAs(sessionStorage.getItem('compositionUrl'), sessionStorage.getItem('compositionName') + ".mp3");
    }

    return (
        <Grid container component="main" className={classes.root}>
            <Button onClick={downloadHandler} variant={"contained"}  style={{ textAlign:'center', justifyContent: 'center', alignSelf: 'center', margin: 'auto', marginTop: '20px', marginBottom: '20px'}}>
                Download
            </Button>
            <video
                autoPlay={true}
                muted
                className={classes.video}
                loop
                src={fileName}
                type="video/mp4"
                ref={videoRef}
            />
        </Grid>
    );
}


const useStyles = makeStyles(theme => ({
    root: {
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
    upload: {
        margin: theme.spacing(2.7, 0),
    },
    playGrid: {
        display: 'flex'
    },
    slider: {
        marginTop: theme.spacing(1.5)
    },
    video: {
        width: '100%',
        height: '100%',
        margin: theme.spacing(0,15)
    }
}));