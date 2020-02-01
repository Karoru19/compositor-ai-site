import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import 'typeface-roboto';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Link from '@material-ui/core/Link';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/core/SvgIcon/SvgIcon';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';
import PauseIcon from '@material-ui/icons/PauseCircleFilled';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Container from '@material-ui/core/Container';
import { saveAs } from 'file-saver';

export default class History extends Component {
  audio = new Audio();

  componentDidMount() {
    fetch('http://127.0.0.1:8000/api/history/', {
      method: 'GET',
      headers: { Authorization: `Token ${sessionStorage.getItem('token')}` }
    })
      .then(res => {
        res.json().then(json => {
          console.log(json);
          this.setState({ songs: json });
        });
        //this.setState({songs:res});
        return res;
      })
      .catch(err => err);

    this.state.songs.forEach(song => {
      this.state.pause.push(song.composition.id);
    });
  }

  componentWillUnmount() {
    this.audio.pause();
  }

  state = {
    pause: [],
    songs: [],
    lastAudioIndex: -1,
    isPlaying: 0
  };

  setPause = value => {
    const newPause = [...this.state.pause];

    console.log(newPause);

    if (newPause.includes(value.composition.id)) {
      console.log('pause');
      newPause.splice(newPause.indexOf(value.composition.id), 1);
      this.audio.pause();
      this.setState({ isPlaying: 0 });
    } else {
      console.log('play');
      newPause.push(value.composition.id);
      console.log(newPause);
      if (this.state.lastAudioIndex === value.composition.id) {
        console.log('play last index');
        this.audio.play();
        this.setState({ isPlaying: 1 });
      } else {
        console.log('play new');
        console.log(value.composition.file);
        this.audio.pause();
        if (this.state.lastAudioIndex !== -1 && this.state.isPlaying === 1) {
          console.log('delete last state');
          newPause.splice(newPause.indexOf(this.state.lastAudioIndex), 1);
        }
        this.audio = new Audio(value.composition.file);
        this.audio.play();
        this.setState({ isPlaying: 1 });
        this.setState({ lastAudioIndex: value.composition.id });
      }
    }

    this.setState({ pause: newPause });
  };

  downloadHandleEvent = song => {
    var FileSaver = require('file-saver');
    FileSaver.saveAs(song.composition.file, song.composition.name + '.mp3');
  };

  deleteSong = index => {
    let array = [...this.state.songs]; // make a separate copy of the array
    let arrayIndex = array.indexOf(index);
    if (arrayIndex !== -1) {
      array.splice(arrayIndex, 1);
      this.setState({ songs: array });
    }
  };

  render() {
    return (
      <Container component="main">
        <Typography component="h1" variant="h5">
          Your songs:
        </Typography>
        <Grid item xs={12} md={12}>
          <HistoryDiv
            deleteSongHandler={this.deleteSong}
            playButtonHandleEvent={this.setPause}
            downloadHandleEvent={this.downloadHandleEvent}
            songs={this.state.songs}
            pause={this.state.pause}
          />
        </Grid>
      </Container>
    );
  }
}

const HistoryDiv = ({
  deleteSongHandler,
  playButtonHandleEvent,
  downloadHandleEvent,
  songs,
  pause
}) => {
  const classes = useStyles();

  return (
    <div className={classes.demo}>
      <List>
        {songs.map(value => {
          return (
            <ListItem key={value.composition.id}>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={value.composition.name} />
              <ListItemSecondaryAction>
                <Button onClick={() => playButtonHandleEvent(value)}>
                  <PlayIcon
                    style={
                      pause.includes(value.composition.id)
                        ? { display: 'none' }
                        : {}
                    }
                  />
                  <PauseIcon
                    style={
                      pause.includes(value.composition.id)
                        ? {}
                        : { display: 'none' }
                    }
                  />
                </Button>
                <Button onClick={() => deleteSongHandler(value)}>
                  <DeleteIcon />
                </Button>
                <Link>
                  <Button onClick={() => downloadHandleEvent(value)}>
                    <DownloadIcon />
                  </Button>
                </Link>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    margin: theme.spacing(8, 4)
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  title: {
    margin: theme.spacing(4, 0, 2)
  },
  commandButtons: {
    display: 'flex'
  },
  dialogContent: {
    padding: theme.spacing(20, 0, 0, 0)
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  upload: {
    margin: theme.spacing(2.7, 0)
  }
}));
