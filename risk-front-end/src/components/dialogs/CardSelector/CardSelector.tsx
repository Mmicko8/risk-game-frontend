import {Dialog, DialogActions, DialogContent} from "@mui/material";
import Button from "@mui/material/Button";
import {GameModel} from "../../../model/GameModel";
import {useState} from "react";
import TroopCard from "./TroopCard";

interface CardSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (cardNames: string[]) => void;
    game: GameModel
}

export default function CardSelector({isOpen, onClose, onSubmit, game}: CardSelectorProps) {
    const currentPlayer = game.playersInGame[game.currentPlayerIndex];
    const cards = currentPlayer.playerCards.map(pc => pc.card);
    const [selectedCards, setSelectedCards] = useState<string[]>([]);

    const toggleCard = (cardName: string) => {
        if (selectedCards.includes(cardName)) setSelectedCards(selectedCards.filter(c => c !== cardName))
        else setSelectedCards([...selectedCards, cardName]);
    }

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xl">
            <DialogContent style={{display: "flex", justifyContent: "space-between"}}>
                {cards.map(c => (
                    <TroopCard key={c.name} card={c}
                               onClick={() => toggleCard(c.name)}
                               isHighlighted={selectedCards.includes(c.name)}/>))}
            </DialogContent>
            <DialogActions>
                <Button variant="contained" fullWidth onClick={() => onSubmit(selectedCards)}>
                    Exchange Cards
                </Button>
            </DialogActions>
        </Dialog>);
}
