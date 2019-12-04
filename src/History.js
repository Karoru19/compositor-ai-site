import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import 'typeface-roboto';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Link from "@material-ui/core/Link";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/core/SvgIcon/SvgIcon";
import DeleteIcon from "@material-ui/icons/Delete";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import PlayIcon from '@material-ui/icons/PlayCircleFilled';
import PauseIcon from '@material-ui/icons/PauseCircleFilled';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Container from "@material-ui/core/Container";

export default class History extends Component {

    state = {
        pause: [-1, -1, -1, -1],
        songs: [0, 1, 2, 3]
    };

    setPause = index => {

        const newPause = [...this.state.pause];

        if (newPause[index] === -1) {
            newPause[index] = 1;
        } else {
            newPause[index] = -1;
        }

        this.setState({pause: newPause});
    };

    downloadHandleEvent = index => {
        console.log(index);
    };

    deleteSong = index => {
        let array = [...this.state.songs]; // make a separate copy of the array
        let arrayIndex = array.indexOf(index);
        if (arrayIndex !== -1) {
            array.splice(arrayIndex, 1);
            this.setState({songs: array});
        }
    };

    render() {
        return (
            <Container component="main">
                <Typography component="h1" variant="h5">
                    Your songs:
                </Typography>
                <Grid item xs={12} md={12}>
                    <HistoryDiv deleteSongHandler={this.deleteSong} playButtonHandleEvent={this.setPause}
                                downloadHandleEvent={this.downloadHandleEvent}
                                songs={this.state.songs} pause={this.state.pause}/>
                </Grid>
            </Container>
        );
    }
}


const HistoryDiv = ({deleteSongHandler, playButtonHandleEvent, downloadHandleEvent, songs, pause}) => {
    const classes = useStyles();


    return (
        <div className={classes.demo}>
            <List>
                {songs.map(value => {
                    return (
                        <ListItem key={value}>
                            <ListItemAvatar>
                                <Avatar>
                                    <FolderIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Song"
                                secondary='Secondary text'
                            />
                            <ListItemSecondaryAction>
                                <Button onClick={() => playButtonHandleEvent(value)}>
                                    <PlayIcon style={pause[value] !== -1 ? {} : {display: "none"}}/>
                                    <PauseIcon style={pause[value] !== -1 ? {display: "none"} : {}}/>
                                </Button>
                                <Button onClick={() => deleteSongHandler(value)}>
                                    <DeleteIcon/>
                                </Button>
                                <Link>
                                    <Button
                                        onClick={() => downloadHandleEvent(value)}>
                                        <DownloadIcon/>
                                    </Button>
                                </Link>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
        margin: theme.spacing(8, 4),
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
    commandButtons: {
        display: 'flex',
    },
    dialogContent: {
        padding: theme.spacing(20, 0, 0, 0)
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
    }
}));