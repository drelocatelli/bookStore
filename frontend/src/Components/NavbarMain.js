import {AppBar, Toolbar, Typography, makeStyles, Link, Button, Grid} from '@material-ui/core'
import {useAuth} from '../Authentication/AuthProvider';

const classes = makeStyles({
    appbar: {
        background: '#333'
    }
})

export default() => {

    const auth = useAuth();
    
    return (
        <>
            <AppBar className={classes().appbar} position={"fixed"}>
                <Toolbar>
                    <Grid container>
                        <Grid item md={10}>
                            <Typography variant={"h5"}>
                                <Link href={"/"} underline={"none"} color={"inherit"}>BookStore</Link>
                            </Typography>
                        </Grid>

                        <Grid item md={2} align={"right"}>
                            <Button color="inherit" href={"/main"}>Home</Button>
                            <Button color="inherit" href={"/main"}>Add new book</Button>
                            <Button color="inherit" onClick={auth.logout}>Logout</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    );
}
