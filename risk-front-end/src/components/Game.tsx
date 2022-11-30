import Board from "./Board";
import PlayerFrame from "./Player/PlayerFrame";
import Grid from "@mui/material/Grid";
import CurrentPlayer from "./Player/CurrentPlayer";

export default function Game() {
    const selectCountry = (e: any, country: string) => {
        console.log(e, country);
    }
    return (
        <Grid container alignItems="center" justifyItems="center" sx={{minHeight: "90vh"}}>
            <Grid item xs={10}>
                <Board selectCountry={selectCountry}/>
            </Grid>
            <Grid item xs={2}>
                <PlayerFrame/>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
                <CurrentPlayer/>
            </Grid>
        </Grid>
    );
}
