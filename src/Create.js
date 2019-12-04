import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Link from "@material-ui/core/Link";
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
    commandButtons: {
        display: 'flex',
    },
    dialogContent: {
        padding: theme.spacing(20, 0, 0, 0)
    }
}));

function generate(element) {
    return [0, 1, 2].map(value =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default class Create extends Component {

    state = {
        addSongOpen: false,
        customizeSongOpen: false,
        availableSongs: [0,1,2,3,4],
        addedSongs: []
    };

    addSongHandleClickOpen = () => {
        this.setState({addSongOpen: true});
    };

    addSongHandleClose = () => {
        this.setState({addSongOpen: false});
    };

    customizeSongHandleClickOpen = () => {
        this.setState({customizeSongOpen: true});
    };

    customizeSongHandleClose = () => {
        this.setState({customizeSongOpen: false});
    };

    addSong = (songsArray) => {
        let addedArray = [...this.state.addedSongs]; // make a separate copy of the array
        let availableArray = [...this.state.availableSongs]; // make a separate copy of the array
        songsArray.forEach((item, index)=>{
            if (item !== -1)
            {
                addedArray.push(item);
                availableArray.splice(index,1);
            }
        });
        this.setState({addedSongs: addedArray});
        this.setState({availableSongs: availableArray});
        this.addSongHandleClose();
    }


    render() {
        return (
            <Container component="main">
                <Typography component="h1" variant="h5">
                    Choose songs to mix:
                </Typography>
                <CreateDiv addedSongs={this.state.addedSongs} addSongHandleClickOpen={this.addSongHandleClickOpen} customizeSongHandleClickOpen={this.customizeSongHandleClickOpen}/>
                <SongsListDiv addSongsHandler={this.addSong} addSongOpen={this.state.addSongOpen} addSongHandleClose={this.addSongHandleClose} songs={this.state.availableSongs}/>
                <CustomizeDiv customizeSongOpen={this.state.customizeSongOpen} customizeSongHandleClose={this.customizeSongHandleClose}/>
            </Container>
        )
    };
}

const CreateDiv = ({customizeSongHandleClickOpen, addSongHandleClickOpen, addedSongs}) => {
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    return (
        <div>
            <Grid item xs={12} md={12}>
                <div className={classes.demo}>
                    <List dense={dense}>
                        {addedSongs.map(value => {
                            const labelId = `checkbox-list-label-${value}`;

                            return (
                                <ListItem key={labelId}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`Song ${value + 1}`}
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                    {/*<ListItemSecondaryAction>*/}
                                    {/*    <Button*/}
                                    {/*        onClick={customizeSongHandleClickOpen}>*/}
                                    {/*        <SettingsApplicationsIcon/>*/}
                                    {/*    </Button>*/}
                                    {/*</ListItemSecondaryAction>*/}
                                </ListItem>
                            );
                        })
                        }
                    </List>
                </div>
            </Grid>
            <Grid item md={12} className={classes.commandButtons}>
                <Grid item xs={12} md={6}>
                    <form className={classes.form} noValidate>
                        <Button className={classes.upload}
                                fullWidth
                                variant="contained"
                                component="label"
                                onClick={addSongHandleClickOpen}
                        >
                            Add song from library
                        </Button>
                    </form>
                </Grid>

                <Grid item xs={12} md={6}>

                    <Link href="/download" variant="body2">
                        <Button fullWidth
                                variant="contained">
                            Create song
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </div>);
}

const CustomizeDiv = ({saveCustomizeHandler, customizeSongHandleClose, customizeSongOpen}) => {
    const classes = useStyles();
    const [sliderValue, setSliderValue] = React.useState([20, 37]);

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
    };

    return (
        <Dialog fullScreen open={customizeSongOpen} onClose={customizeSongHandleClose}
                TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={customizeSongHandleClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Customize song
                    </Typography>
                    <Button autoFocus color="inherit" onClick={saveCustomizeHandler}>
                        Save
                    </Button>
                </Toolbar>
            </AppBar>
            <Slider className={classes.dialogContent}
                    value={sliderValue}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
            />
        </Dialog>
    );
};

const SongsListDiv = ({addSongsHandler, addSongHandleClose, addSongOpen, songs}) => {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const addHandler = () => {
        addSongsHandler(checked);
        const newChecked = [...checked];

        newChecked.forEach((item, index)=>{
            if (item !== -1) {
                newChecked.splice(index, 1);
            }
            setChecked(newChecked);
        })

    };

    return (
        <Dialog fullScreen open={addSongOpen} onClose={addSongHandleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={addSongHandleClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Song
                    </Typography>
                    <Button autoFocus color="inherit" onClick={addHandler}>
                        Add
                    </Button>
                </Toolbar>
            </AppBar>
            <List className={classes.dialogContent}>
                {songs.map(value => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                        <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{'aria-labelledby': labelId}}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`Song ${value + 1}`}/>
                        </ListItem>
                    );
                })
                }
            </List>
        </Dialog>);
};