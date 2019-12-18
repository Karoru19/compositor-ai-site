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
import LinearProgress from '@material-ui/core/LinearProgress';
import { Link } from "@material-ui/core";

const BorderLinearProgress = withStyles({
    root: {
        height: 10,
        backgroundColor: lighten('#ff6c5c', 0.5),
    },
    bar: {
        borderRadius: 20,
        backgroundColor: '#ff6c5c',
    },
})(LinearProgress);

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
        margin: '30px',
        width: '100%',
        maxWidth: '85%'
    }
}));

const rand = Math.floor(Math.random() * 30) + 1 ;
const fileName = "Video/" + rand + ".mp4";

export default function Download() {
    const videoRef = React.createRef(null);
    const classes = useStyles();
    const [progress, setProgress] = React.useState(50);
    const [songProgress, setSongProgress] = React.useState(0);
    const [pause, setPause] = React.useState([0]);

    console.log(fileName);
    const playButtonClick = () => {
        console.log(fileName);
        setPause(!pause);
        if (pause) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    React.useEffect(() => {
        function tick() {
            // reset when reaching 100%
            setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
            if (!pause) {
                setSongProgress(oldProgress => (oldProgress >= 100 ? oldProgress : oldProgress + 1))
            }
        }

        const timer = setInterval(tick, 20);
        return () => {
            clearInterval(timer);
        };
    }, []);
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={12} sm={12} md={12} component={Paper} >
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Downloading...
                    </Typography>
                    <CircularProgress variant="determinate" value={progress} />
                </div>
            </Grid>
            <Grid className={classes.playGrid}  item xs={12} sm={12} md={12} component={Paper} >
                <CssBaseline />
                <Button item xs={2} sm={2} md={2} onClick={playButtonClick}>
                    <PlayIcon style={pause ? {} : {display: "none"}}/>
                    <PauseIcon style={pause ? {display: "none"} : {}}/>
                </Button>
                <Grid  item xs={10} sm={10} md={10}
                       className={classes.slider}>
                    <BorderLinearProgress
                        variant="determinate"
                        color="secondary"
                        value={songProgress}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} component={Paper} >
                <CssBaseline />
                <div>
                    <video
                        muted
                        className={classes.video}
                        loop
                        src={fileName}
                        type="video/mp4"
                        ref={videoRef}
                    />
                </div>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Your song is ready!
                    </Typography>

                    <Link href="/home" variant="body2">
                        <Button fullWidth
                            variant="contained">
                            Download!
                        </Button>
                    </Link>
                </div>
            </Grid>

        </Grid>
    );
}