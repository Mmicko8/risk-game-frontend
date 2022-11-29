
import {getTerritoryData} from "../services/territoryService";
import Territory from "./map/Territory";
import {TerritoryModel} from "../model/TerritoryModel";

interface BoardProps {
    selectCountry: (e: string, country: string) => void;
    territories: TerritoryModel[];
}

export default function Board({selectCountry, territories}: BoardProps) {
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <svg xmlns="http://www.w3.org/2000/svg"
                 width={'80%'} height={'70%'}
                 viewBox={`0 0 ${1024} ${660}`}>
                <g id="map" fill="none" strokeWidth="1.5">
                    {territories.map((t) => {
                        let drawData = getTerritoryData(t.name);

                        return <g key={t.name} stroke={drawData.strokeColor}
                           fill={drawData.fillColor} visibility="visible">
                            <Territory drawPath={drawData.drawPath} name={t.name}
                                       troopCount={t.troops}
                                       callback={selectCountry} xOffset={drawData.xOffset}
                                       yOffset={drawData.yOffset}/>
                        </g>
                    })}
                </g>
            </svg>
        </div>
    )
}
