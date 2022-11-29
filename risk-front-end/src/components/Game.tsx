import Board from "./Board";
import PlayerFrame from "./PlayerFrame";
import Grid from "@mui/material/Grid";

export default function Game() {
    const selectCountry = (e: any, country: string) => {
        console.log(e, country);
    }
    return (
        <div style={{backgroundColor:"white"}}>
            <Grid container>
                <Grid item xs={10}>
                    <Board selectCountry={selectCountry}/>
                </Grid>
                <Grid item xs={2}>
                    <PlayerFrame/>
                </Grid>
            </Grid>
        </div>
    );
}
