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
    upload:{
        margin: theme.spacing(2.7,0),
    }
}));

function generate(element) {
    return [0, 1, 2].map(value =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}
export default function History() {
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    const [pause, setPause] = React.useState([0]);


    const playButtonClick = () => {
        setPause(!pause);
    };

    return (
        <Grid container component="main" className={classes.root}>
            <Typography>
                Your songs
            </Typography>
            <Grid item xs={12} md={12}>
                <div className={classes.demo}>
                    <List dense={dense}>
                        {generate(
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
                                    <Button onClick={playButtonClick}>
                                        <PlayIcon style={pause ? {} : {display: "none"}}/>
                                        <PauseIcon style={pause ? {display: "none"} : {}}/>
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
                            </ListItem>,
                        )}
                    </List>
                </div>
            </Grid>
        </Grid>
    );
}

const theme = {
    spacing: 8,
}