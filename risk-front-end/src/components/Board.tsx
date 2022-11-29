
import Territory from "./map/Territory";
import {territories} from "../data/TerritoryData";

interface BoardProps {
    selectCountry: (e: string, country: string) => void;
}

const NAME = 0;
const TERRITORY_INFO = 1;

export default function Board({selectCountry}: BoardProps) {
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <svg xmlns="http://www.w3.org/2000/svg"
                 width={'80%'} height={'70%'}
                 viewBox={`0 0 ${1024} ${660}`}>
                <g id="map" fill="none" strokeWidth="1.5">
                    {Object.entries(territories).map((props) => (
                        <g key={props[NAME]} stroke={props[TERRITORY_INFO].strokeColor}
                           fill={props[TERRITORY_INFO].fillColor} visibility="visible">
                            <Territory drawPath={props[TERRITORY_INFO].drawPath} name={props[NAME]} _troopCount={10}
                                       callback={selectCountry} xOffset={props[TERRITORY_INFO].xOffset}
                                       yOffset={props[TERRITORY_INFO].yOffset}/>
                        </g>
                    ))}
                </g>
            </svg>
        </div>
    )
}
