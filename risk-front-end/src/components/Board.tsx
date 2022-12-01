
import {getTerritoryDrawData} from "../services/territoryService";
import Territory from "./map/Territory";
import {TerritoryModel} from "../model/TerritoryModel";
import {useContext} from "react";
import GameStateContext from "../context/GameStateContext";
import {GameModel} from "../model/GameModel";

interface BoardProps {
    selectTerritory: (e: string, territoryName: string) => void;
    territories: TerritoryModel[];
    attackableTerritoryNames: string[] | null;
}

function getTerritoryColor(game: GameModel, territoryOwnerId: number) {
    for (let i = 0; i < game.playersInGame.length; i++) {
        if (game.playersInGame[i].playerInGameId === territoryOwnerId) {
            return game.playersInGame[i].color;
        }
    }
}

export default function Board({selectTerritory, territories, attackableTerritoryNames}: BoardProps) {
    const strokeColor = (territoryName: string) => {
        if (attackableTerritoryNames && attackableTerritoryNames.includes(territoryName)) {
            return '#ff0000';
        }
        return "#545454";
    }
    const strokeWidth = (territoryName: string) => {
        if (attackableTerritoryNames && attackableTerritoryNames.includes(territoryName)) {
            return "2.5";
        }
    }
    const {game} = useContext(GameStateContext);

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <svg xmlns="http://www.w3.org/2000/svg"
                 width={'70%'} height={'70%'}
                 viewBox={`0 0 ${1024} ${650}`}>
                <g id="map" fill="none" strokeWidth="1.5">
                    {territories.map((t) => {
                        let drawData = getTerritoryDrawData(t.name);

                        return <g key={t.name} stroke={strokeColor(t.name)} strokeWidth={strokeWidth(t.name)}
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
