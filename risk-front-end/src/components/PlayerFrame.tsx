import Box from '@mui/material/Box'
import Avatar from "@mui/material/Avatar";

export default function PlayerFrame() {
    return (
        <Box sx={{height:"7vw", mt:"1rem", mr:"1rem", border: 1, borderRadius: 3, alignContent: "center", alignItems: "center"}}>
            <Avatar sx={{ width: "7vw", height: "7vw" }} src="testAvatar.jpg"></Avatar>
        </Box>
    );
}