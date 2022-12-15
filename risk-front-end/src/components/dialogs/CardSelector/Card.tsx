import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import './Card.css'
import {CardModel} from "../../../model/CardModel";

interface CardProps {
    card: CardModel
    isHighlighted: boolean
    onClick: () => void;
}

export default function Card({card, isHighlighted, onClick}: CardProps) {
    return <Paper className={isHighlighted ? "highlight" : ""} onClick={onClick}
                  style={{
                      minWidth: "135px",
                      height: "120px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                  }}
    >
        <Typography>{card.name}</Typography>
        <div>
            {[...Array(card.stars)].map(() => <StarIcon/>)}
        </div>
    </Paper>
}