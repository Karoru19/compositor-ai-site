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
import DeleteIcon from "@material-ui/icons/Delete";
import PlayIcon from '@material-ui/icons/PlayCircleFilled';
import PauseIcon from '@material-ui/icons/PauseCircleFilled';

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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default class Create extends Component {
    audio = new Audio();

    componentDidMount() {
        fetch('http://127.0.0.1:8000/api/song/', {
            method: 'GET'
        }).then(res => {
            res.json().then(json=>{
                console.log(json);
                this.setState({availableSongs:json});
                this.setState({songs:json});
            });
            //this.setState({songs:res});
            return res;
        }).catch(err => err);

        this.state.songs.forEach(song=>{
            this.state.pause.push(song.id);
        })
    }

    componentWillUnmount() {
        this.audio.pause();
    }


    state = {
        addSongOpen: false,
        customizeSongOpen: false,
        songs:[],
        availableSongs: [],
        addedSongs: [],
        lastAudioIndex: -1,
        isPlaying: 0,
        pause:[]
    };

    setPause = value => {

        const newPause = [...this.state.pause];

        console.log(newPause);

        if (newPause.includes(value.id)) {
            console.log("pause")
            newPause.splice(newPause.indexOf(value.id),1);
            this.audio.pause();
            this.setState({isPlaying: 0});
        } else {
            console.log("play")
            newPause.push(value.id);
            console.log(newPause);
            if (this.state.lastAudioIndex === value.id)
            {
                console.log("play last index");
                this.audio.play();
                this.setState({isPlaying: 1});
            }
            else
            {
                console.log("play new");
                console.log(value.ogg);
                this.audio.pause();
                if (this.state.lastAudioIndex !== -1 && this.state.isPlaying === 1)
                {
                    console.log("delete last state");
                    newPause.splice(newPause.indexOf(this.state.lastAudioIndex),1);
                }
                this.audio = new Audio(value.ogg);
                this.audio.play();
                this.setState({isPlaying: 1});
                this.setState({lastAudioIndex:value.id});
            }
        }

        this.setState({pause: newPause});
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

        songsArray.forEach((item)=>{
            if (item !== -1)
            {
                addedArray.push(item);
                availableArray.splice(availableArray.indexOf(item),1);
            }
        });
        this.setState({addedSongs: addedArray});
        this.setState({availableSongs: availableArray});

        this.addSongHandleClose();
    };

    deleteSongHandler = (song)=>{
        let addedArray = [...this.state.addedSongs]; // make a separate copy of the array
        let availableArray = [...this.state.availableSongs]; // make a separate copy of the array

        addedArray.splice(addedArray.indexOf(song),1);
        availableArray.push(song);

        this.setState({addedSongs: addedArray});
        this.setState({availableSongs: availableArray});
    };

    createSongHandler = ()=>{
        let addedArray = [...this.state.addedSongs];

        let addedSongsIndexes = [];

        addedArray.forEach(item=>{
            addedSongsIndexes.push(item.id);
        });

        fetch('http://127.0.0.1:8000/api/compose/', {
            method: 'POST',
            body: JSON.stringify({
                songs:addedSongsIndexes,
                name:"song_" + new Date().toISOString()
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${sessionStorage.getItem('token')}` 
            }
        }).then(res => {
            if (res.ok){

                // sessionStorage.setItem('compositionUrl', 'http://127.0.0.1:8000/media/Sandstorm.mp3');
                // this.props.history.push('/download');
                
                res.json().then(json=>{
                    sessionStorage.setItem('compositionUrl', json.url);
                    this.props.history.push('/download');
                })
            }
        }).catch(err => err);
    };

    render() {
        return (
            <Container component="main">
                <Typography component="h1" variant="h5">
                    Choose songs to mix:
                </Typography>
                <CreateDiv createSongHandler={this.createSongHandler} playButtonHandleEvent={this.setPause} pause={this.state.pause} deleteSongHandler={this.deleteSongHandler} addedSongs={this.state.addedSongs} addSongHandleClickOpen={this.addSongHandleClickOpen} customizeSongHandleClickOpen={this.customizeSongHandleClickOpen}/>
                <SongsListDiv addSongsHandler={this.addSong} addSongOpen={this.state.addSongOpen} addSongHandleClose={this.addSongHandleClose} songs={this.state.availableSongs}/>
                <CustomizeDiv customizeSongOpen={this.state.customizeSongOpen} customizeSongHandleClose={this.customizeSongHandleClose}/>
            </Container>
        )
    };
}

const CreateDiv = ({createSongHandler, pause, playButtonHandleEvent, deleteSongHandler, customizeSongHandleClickOpen, addSongHandleClickOpen, addedSongs}) => {
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    return (
        <div>
            <Grid item xs={12} md={12}>
                <div className={classes.demo}>
                    <List dense={dense}>
                        {addedSongs.map(value => {
                            const labelId = `checkbox-list-label-${value.mp3}`;

                            return (
                                <ListItem key={labelId}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`Song '${value.filename}'`}
                                    />
                                    <ListItemSecondaryAction>
                                        <Button
                                            onClick={()=>deleteSongHandler(value)}>
                                            <DeleteIcon/>
                                        </Button>
                                        <Button onClick={() => playButtonHandleEvent(value)}>
                                            <PlayIcon style={pause.includes(value.id)   ? {display: "none"} : {}}/>
                                            <PauseIcon style={pause.includes(value.id) ? {} : {display: "none"}}/>
                                        </Button>
                                    </ListItemSecondaryAction>
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
                    <Button fullWidth
                            variant="contained"
                            onClick={()=>createSongHandler()}>
                        Create song
                    </Button>
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
    const [checked, setChecked] = React.useState([]);

    const handleToggle = value => () => {
        const newChecked = [...checked];

        if (newChecked.indexOf(value) === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(newChecked.indexOf(value), 1);
        }

        setChecked(newChecked);
    };

    const addHandler = () => {
        addSongsHandler(checked);
        const newChecked = [...checked];
        setChecked([]);
    };

    return (
        <Dialog fullScreen open={addSongOpen} onClose={addSongHandleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={addSongHandleClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h5" >
                        Choose songs
                    </Typography>
                    <Button style={{marginLeft: '20px'}} autoFocus color="inherit" onClick={addHandler}>
                        Add
                    </Button>
                </Toolbar>
            </AppBar>
            <List className={classes.dialogContent}>
                {songs.map(value => {
                    const labelId = `checkbox-list-label-${value.mp3}`;

                    return (
                        <ListItem key={value.mp3} role={undefined} dense button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{'aria-labelledby': labelId}}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`Song '${value.filename}'`}/>
                        </ListItem>
                    );
                })
                }
            </List>
        </Dialog>);
};