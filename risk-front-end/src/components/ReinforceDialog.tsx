import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import {ChangeEvent, useState} from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@mui/material";


interface ReinforceDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
}

export default function ReinforceDialog({isOpen, onClose, onSubmit}: ReinforceDialogProps) {

    // const {
    //     control,
    //     handleSubmit,
    //     reset,
    //     formState: {errors},
    // } = useForm({
    //     defaultValues: {
    //         name: "",
    //         description: "",
    //         image: "",
    //         price: 0,
    //         inPromotion: false,
    //         stock: 0,
    //         stockMinimum: 0,
    //         departmentId: ""
    //     }
    // });

    const Input = styled(MuiInput)`
      width: 42px;
    `;

    const [value, setValue] = useState(1);

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === "number") {
            setValue(newValue)
        }
        else {
            setValue(1);
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value === '' ? 1 : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <Box sx={{width: 250}}>
                <Typography id="input-slider" gutterBottom>Troops</Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                        <Slider value={value} onChange={handleSliderChange} aria-labelledby="input-slider"/>
                    </Grid>
                    <Grid item>
                        <Input
                            value={value}
                            size="small"
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            inputProps={{
                                step: 10,
                                min: 0,
                                max: 100,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Dialog>);
}