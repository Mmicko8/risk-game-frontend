import Box from "@mui/material/Box";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {useState} from "react";
import Fab from '@mui/material/Fab';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Avatar from "@mui/material/Avatar";

const steps = [
    'Reinforce',
    'Attack',
    'Fortify',
];

export default function CurrentPlayer() {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    return(
        <Box display="flex" alignContent="center" justifyContent="center" position="relative"
         sx={{height:"15vh", width: "25vw", mt:"1rem", mr:"1rem", border: 1, borderRadius: 3, backgroundColor: "rgba(98,98,98,0.61)"}}>
            <Stepper sx={{position:"absolute", top:"35%"}} activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Fab color="success" sx={{position: "absolute", top: "30%", right:"2%"}} onClick={handleNext}>
                {activeStep === steps.length - 1 ? <KeyboardDoubleArrowRightIcon/> : <KeyboardArrowRightIcon/>}
            </Fab>
            <Avatar sx={{position:"absolute", margin:"0.25rem", left:"0%", width: "7vw", height: "7vw" }} src="testAvatar.jpg"></Avatar>
        </Box>
    )
}