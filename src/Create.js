import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
    dialogContent:{
        padding: theme.spacing(20,0,0,0)
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

export default function Create() {
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    const [addSongOpen, addSongSetOpen] = React.useState(false);
    const [customizeSongOpen, customizeSongSetOpen] = React.useState(false);
    const [checked, setChecked] = React.useState([0]);
    const [sliderValue, setSliderValue] = React.useState([20, 37]);

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
    };

    const addSongHandleClickOpen = () => {
        addSongSetOpen(true);
    };

    const addSongHandleClose = () => {
        addSongSetOpen(false);
    };


    const customizeSongHandleClickOpen = () => {
        customizeSongSetOpen(true);
    };

    const customizeSongHandleClose = () => {
        customizeSongSetOpen(false);
    };

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

    return (
        <Container component="main">
            <Typography>
                Choose songs to mix:
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
                                    <Button
                                        onClick={customizeSongHandleClickOpen}>
                                        <SettingsApplicationsIcon />
                                    </Button>
                                </ListItemSecondaryAction>
                            </ListItem>,
                        )}
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
                    {/*<form className={classes.form} noValidate>*/}
                    {/*    <Button className={classes.upload}*/}
                    {/*            fullWidth*/}
                    {/*            variant="contained"*/}
                    {/*            component="label"*/}
                    {/*    >*/}
                    {/*        Create song*/}
                    {/*        <input*/}
                    {/*            type="file"*/}
                    {/*            style={{ display: "none" }}*/}
                    {/*        />*/}
                    {/*    </Button>*/}
                    {/*</form>*/}
                </Grid>
            </Grid>
            <Dialog fullScreen open={addSongOpen} onClose={addSongHandleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={addSongHandleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Song
                        </Typography>
                        <Button autoFocus color="inherit" onClick={addSongHandleClose}>
                            Add
                        </Button>
                    </Toolbar>
                </AppBar>
                <List className={classes.dialogContent}>
                    {[0, 1, 2, 3].map(value => {
                        const labelId = `checkbox-list-label-${value}`;

                        return (
                            <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(value) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                            </ListItem>
                        );
                    })}
                </List>
            </Dialog>
            <Dialog fullScreen open={customizeSongOpen} onClose={customizeSongHandleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={customizeSongHandleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Customize song
                        </Typography>
                        <Button autoFocus color="inherit" onClick={customizeSongHandleClose}>
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
        </Container>
    );
}