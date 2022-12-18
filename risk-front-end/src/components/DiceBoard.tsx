import {useEffect, useState} from "react";
import DiceBox from "@3d-dice/dice-box-threejs";


export function DiceBoard() {
    const [diceBox, setDiceBox] = useState<any>();

    useEffect(() => {
        const db = new DiceBox("#dice-container", {
                theme_customColorset: {
                    background: "#700808",
                    foreground: "#ffffff"
                }
            }
        );
        db.initialize();
        console.log("i firfe once")
        setDiceBox(db);
    }, []);

    function throwDice() {
        if (!diceBox) return;
        diceBox.roll("3d6@1,4,6");
    }

    return <>
        <div id="dice-container" style={{width: "600px", height: "600px"}}></div>
        <button onClick={throwDice}>click</button>
    </>
}