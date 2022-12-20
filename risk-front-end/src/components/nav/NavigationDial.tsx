import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import HomeIcon from '@mui/icons-material/Home';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import AccessContext from "../../context/AccessContext";
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export function NavigationDial() {
    const {username, removeUsername, removeAccessToken} = useContext(AccessContext);
    const navigate = useNavigate();

    function getNavigationActions() {
        let actions = [
            { icon: <HomeIcon />, name: 'Home', action: () => navigate("/") }];
        if (username) {
            actions.push({ icon: <FingerprintIcon />, name:"Logout", action: () => {removeUsername(); removeAccessToken()}});
        } else {
            actions.push({ icon: <PersonAddIcon />, name:"Register", action: () => navigate("/register")})
            actions.push({ icon: <FingerprintIcon />, name:"Login", action: () => navigate("/sign_in")})
        }
        return actions;
    }

    return (
        <div style={{margin: 0, left: 8, top: 8, position: "fixed"}}>
            <SpeedDial
                ariaLabel="SpeedDial openIcon example"
                sx={{ position: 'absolute', top: 4, left: 4 }}
                icon={<MenuIcon/>}
                direction={"right"}
            >
                {getNavigationActions().map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.action}
                    />
                ))}
            </SpeedDial>
        </div>
    )    ;
}