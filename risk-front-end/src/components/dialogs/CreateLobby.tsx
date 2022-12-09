import {
    Dialog,
    DialogActions,
    DialogContent
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface CreateLobbyProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateLobby({isOpen, onClose} : CreateLobbyProps) {
    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xs">
            <DialogContent>
                <Box sx={{paddingY: "1rem", paddingX: "4rem"}}>
                    <Typography id="input-slider" gutterBottom>Create lobby</Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" fullWidth>Create</Button>
            </DialogActions>
        </Dialog>
    );
}