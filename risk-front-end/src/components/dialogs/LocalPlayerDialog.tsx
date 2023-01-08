import {EmailInvitation} from "../../model/lobby/EmailInvitation";
import {Dialog, DialogTitle} from "@mui/material";
import * as React from "react";
import {useLocalPlayers} from "../../hooks/useLocalPlayers";
import Loading from "../Loading";
import {Alert} from "../Alert";
import {Player} from "../../model/player/Player";
import TableRow from '@mui/material/TableRow';
import {styled, useTheme} from '@mui/material/styles';
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import Typography from "@mui/material/Typography";

interface LocalPlayProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: EmailInvitation) => void;
}

export default function LocalPlayerDialog({isOpen, onClose, onSubmit}: LocalPlayProps) {
    const theme = useTheme();
    const {isLoading, isError, players} = useLocalPlayers();


    if (isLoading || !players) {
        return <Loading/>
    }
    if (isError) {
        return <Alert message={"Error loading the leaderboard"}/>
    }
    //style on table cell
    const StyledTableCell = styled(TableCell)(() => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
        }
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

    const _onSubmit = (data: EmailInvitation) => {
        onSubmit(data);
        onClose();
    }

    function getPlayers() {
        if(players.length === 0) {
            return <Typography textAlign="center">No local players found</Typography>
        }else{
            return <>
                {
                    <Table>
                    <tbody>
                    {players.map((row: Player) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell>{row.username}</StyledTableCell>
                            <StyledTableCell><Button variant="contained" fullWidth onClick={() => {
                                _onSubmit({
                                    type: 'username',
                                    usernameOrEmail: row.username
                                });
                            }}>
                                Invite
                            </Button></StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </tbody>
                    </Table>
                }
            </>
        }
    }

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>Local players</DialogTitle>
            {getPlayers()}
        </Dialog>
    );
}