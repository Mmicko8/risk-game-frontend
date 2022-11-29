
import {getTerritoryDrawData} from "../services/territoryService";
import Territory from "./map/Territory";
import {TerritoryModel} from "../model/TerritoryModel";
import {useContext} from "react";
import GameStateContext from "../context/GameStateContext";
import {GameModel} from "../model/GameModel";

interface BoardProps {
    selectTerritory: (e: string, territoryName: string) => void;
    territories: TerritoryModel[];
}

function getTerritoryColor(game: GameModel, territoryOwnerId: number) {
    for (let i = 0; i < game.playersInGame.length; i++) {
        if (game.playersInGame[i].playerInGameId === territoryOwnerId) {
            return game.playersInGame[i].color;
        }
    }
}

export default function Board({selectTerritory, territories}: BoardProps) {
    const DARK_GREY = "#545454";
    const {game} = useContext(GameStateContext);

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <svg xmlns="http://www.w3.org/2000/svg"
                 width={'80%'} height={'70%'}
                 viewBox={`0 0 ${1024} ${660}`}>
                <g id="map" fill="none" strokeWidth="1.5">
                    {territories.map((t) => {
                        let drawData = getTerritoryDrawData(t.name);

                        return <g key={t.name} stroke={DARK_GREY}
                           fill={getTerritoryColor(game, t.ownerId)} visibility="visible">
                            <Territory drawPath={drawData.drawPath} name={t.name}
                                       troopCount={t.troops}
                                       callback={selectTerritory} xOffset={drawData.xOffset}
                                       yOffset={drawData.yOffset}/>
                        </g>
                    })}
                </g>
            </svg>
        </div>
    )
}
