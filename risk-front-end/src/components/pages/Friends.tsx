import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function Friends() {
    return (
        <Container component="main" maxWidth="md">
            <Grid container>
                <Grid item xs={6} justifyContent="center">
                    <Typography component="h2" variant="h4" textAlign="center">Friends</Typography>
                </Grid>
                <Grid item xs={6} justifyContent="center">
                    <Typography component="h2" variant="h4" textAlign="center">Friend requests</Typography>
                    <Typography component="h2" variant="h4" textAlign="center">Friend requests</Typography>
                    <Typography component="h2" variant="h4" textAlign="center">Friend requests</Typography>
                </Grid>
            </Grid>
        </Container>
    )
}