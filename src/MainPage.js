import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default class MainPage extends Component {

    render() {
        return(
            <MainDiv/>
        )
    }
}

const MainDiv = () => {
    const classes = useStyles();

    return(
        <Grid container>
            <Grid item xs={12}>
                <Paper style={{borderRadius: '25px', marginTop:'100px', marginLeft:'50px',marginRight:'50px', minHeight:'400px'}} className={classes.paper}>
                    <Typography variant={"h3"}>
                        Chill Music Generator
                    </Typography>
                    <Typography style={{marginTop: '50px'}} variant={"h6"}>
                        Create your own unique song!
                    </Typography>
                    <Typography variant={"h6"}>
                        Pick songs from database and we will create very new composition using
                        our Artificial Intelligence algorithm.
                    </Typography>
                    <Typography variant={"h6"}>
                        You can download it for free to your disc, or listen to it on website with great audiovisualisation.
                    </Typography>

                    <Link href="/create"  >
                        <Button style={{marginTop: '100px'}}>
                            <Typography variant={'h4'}>
                                CREATE NOW!
                            </Typography>
                        </Button>
                    </Link>
                </Paper>
            </Grid>
        </Grid>
    )
}