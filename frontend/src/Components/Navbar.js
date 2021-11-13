import {AppBar, Toolbar, Typography, makeStyles, Link} from '@material-ui/core'

const classes = makeStyles({
    appbar: {
        background: '#333'
    }
})

export default() => {
    return (
        <>
            <AppBar className={classes().appbar} position={"fixed"}>
                <Toolbar>
                    <Typography variant={"h5"}>
                        <Link href={"/"} underline={"none"} color={"inherit"}>BookStore</Link>
                    </Typography>
     
                </Toolbar>
            </AppBar>
        </>
    );
}
