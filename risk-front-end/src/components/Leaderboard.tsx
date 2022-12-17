import {useLeaderboard} from "../hooks/useLeaderboard";
import {Alert, CircularProgress} from "@mui/material";
import * as React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import {Player} from "../model/Player";

export default function Leaderboard() {
    const {isLoading, isError, players} = useLeaderboard();

    if (isLoading) {
        return <CircularProgress sx={{position: "fixed", top: "50%", left: "50%"}}/>
    }
    if (isError) {
        return <Alert severity="error">Error loading the leaderboard</Alert>
    }
    //style on table cell
    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));
    //style on table row
    const StyledTableRow = styled(TableRow)(({theme}) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    function Rows() {
        let ranking = 1;
        return (
            <>{players.map((row: Player) => (
                <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                        {ranking++}
                    </StyledTableCell>
                    <StyledTableCell>{row.username}</StyledTableCell>
                    <StyledTableCell>{row.gamesWon}</StyledTableCell>
                </StyledTableRow>
            ))
            }
            </>
        )
    }

    return (
        <TableContainer sx={{width: 300, margin: "auto"}} component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Ranking</StyledTableCell>
                        <StyledTableCell>Player</StyledTableCell>
                        <StyledTableCell>Wins</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <Rows/>
                </TableBody>
            </Table>
        </TableContainer>
    );
}