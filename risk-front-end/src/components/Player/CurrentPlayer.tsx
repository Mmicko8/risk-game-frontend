import Box from "@mui/material/Box";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Fab from '@mui/material/Fab';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Avatar from "@mui/material/Avatar";
import {useContext} from "react";
import AccessContext from "../../context/AccessContext";
import {PlayerInGame} from "../../model/PlayerInGame";
import Typography from "@mui/material/Typography";

interface CurrentPlayerProps {
    nextPhase: () => void;
    nextTurn: () => void;
    currentPhase: number;
    currentPlayer: PlayerInGame
}

const steps = [
    'Reinforce',
    'Attack',
    'Fortify',
];

export default function CurrentPlayer({nextPhase, nextTurn, currentPhase, currentPlayer}: CurrentPlayerProps) {
    const {username} = useContext(AccessContext);
    const handleNext = () => {
        if (steps[currentPhase] === 'Fortify') nextTurn()
        else nextPhase()
    }

    const disableButton = () => {
        return username !== currentPlayer.player.username || !username;
    }

    return (
        <Box display="flex" alignContent="center" justifyContent="center" position="relative"
             sx={{
                 height: "15vh", border: 1, borderRadius: 3, backgroundColor: "rgba(98,98,98,0.61)",
                 display: "flex", justifyContent: "space-around", alignItems: "center"
             }}>
            <Avatar src="testAvatar.jpg" sx={{height: "5vw", width: "5vw", marginLeft: "0.5vw"}}></Avatar>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around" ,height:"100%"}}>
                <Typography>{currentPlayer.player.username}</Typography>
                <Stepper activeStep={currentPhase} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>
            <div style={{height: "5.5vw", width: "5.5vw", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Fab color="success" onClick={handleNext} disabled={disableButton()}
                     style={{height: "4vw", width: "4vw"}}>
                    {currentPhase === steps.length - 1 ? <KeyboardDoubleArrowRightIcon sx={{fontSize: "3vw"}}/> : <KeyboardArrowRightIcon sx={{fontSize: "3vw"}}/>}
                </Fab>
            </div>
        </Box>
    )
}