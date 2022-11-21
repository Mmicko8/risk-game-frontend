import {Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import BoardsIcon from "@mui/icons-material/Dashboard";
import {Link} from "react-router-dom";

interface NavigationProps {
    isOpen: boolean;
    onClose: () => void
}

/**
 * navigatie drawer
 */
export function Navigation({isOpen, onClose}: NavigationProps) {

    //tonen van de navigation drawer
    return (
        <div>
            <Drawer open={isOpen} onClose={onClose}>
                <List sx={{width: 200}}>
                    {[
                        {label: "Lobby", link: "/", icon: <BoardsIcon/>},
                        {label: "Game", link: "/game", icon: <BoardsIcon/>},
                    ].map((menuItem) => (
                        <ListItem disableGutters key={menuItem.link}>
                            <ListItemButton component={Link} to={menuItem.link}>
                                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                                <ListItemText primary={menuItem.label}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    );
}
