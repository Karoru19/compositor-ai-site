import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
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
import CssBaseline from "@material-ui/core/CssBaseline";

export default function History() {
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    const [pause, setPause] = React.useState([-1]);


    const playButtonClick = value => () => {
        const currentIndex = pause.indexOf(value);
        const newPause = [...pause];

        if (currentIndex === -1) {
          newPause.push(value);
        } else {
          newPause.splice(currentIndex, 1);
        }

        setPause(newPause);
    };

    return (
        <Container component="main" >
            <Typography component="h1" variant="h5">
                Your songs:
            </Typography>
            <Grid item xs={12} md={12}>
                <div className={classes.demo}>
                    <List dense={dense}>
                        {[0, 1, 2, 3].map(value =>{
                          return (
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar>
                                  <FolderIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary="Song"
                                secondary={secondary ? 'Secondary text' : null}
                              />
                              <ListItemSecondaryAction>
                                <Button onClick={playButtonClick(value)}>
                                  <PlayIcon style={pause.indexOf(value) !== -1 ? {} : {display: "none"}}/>
                                  <PauseIcon style={pause.indexOf(value) !== -1 ? {display: "none"} : {}}/>
                                </Button>
                                <Button>
                                  <DeleteIcon />
                                </Button>
                                <Link href={"/download"}>
                                  <Button>
                                    <DownloadIcon />
                                  </Button>
                                </Link>
                              </ListItemSecondaryAction>
                            </ListItem>
                          );
                        })}
                    </List>
                </div>
            </Grid>
        </Container>
    );
}

const theme = {
    spacing: 8,
}


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    margin: theme.spacing(8,4),
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
  dialogContent:{
    padding: theme.spacing(20,0,0,0)
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