import {Dialog, DialogActions, DialogContent} from "@mui/material";
import Button from "@mui/material/Button";
import {GameModel} from "../../model/GameModel";
import {useState} from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import './CardSelector.css'

interface CardSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (cardNames: string[]) => void;
    game: GameModel
}

export default function CardSelector({isOpen, onClose, onSubmit, game}: CardSelectorProps) {
    const currentPlayer = game.playersInGame[game.currentPlayerIndex];
    const cards = currentPlayer.playerCards.map(pc => pc.card);
    // const cards = [{name: "NorthWest", stars: 1}, {name: "Alaska", stars: 2}, {name: "SouthAfrica", stars: 1},
    //     {name: "Siam", stars: 2},{name: "SouthEurope", stars: 2},{name: "NorthEurope", stars: 1}]
    const [selectedCards, setSelectedCards] = useState<string[]>([]);

    const toggleCard = (cardName: string) => {
        if (selectedCards.includes(cardName)) setSelectedCards(selectedCards.filter(c => c !== cardName))
        else setSelectedCards([...selectedCards, cardName]);
    }

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xl">
            <DialogContent style={{display: "flex", justifyContent: "space-between"}}>
                {cards.map(c => (
                    <Paper key={c.name} style={{minWidth: "135px", height: "120px", display: "flex",
                        flexDirection: "column", alignItems: "center"}} onClick={() => toggleCard(c.name)}
                        className={selectedCards.includes(c.name) ? "highlight" : ""}>
                        <Typography>{c.name}</Typography>
                        <Typography>stars: {c.stars}</Typography>
                    </Paper>
                ))}
            </DialogContent>
            <DialogActions>
                <Button variant="contained" fullWidth onClick={() => onSubmit(selectedCards)}>
                    Exchange Cards
                </Button>
            </DialogActions>
        </Dialog>);
}