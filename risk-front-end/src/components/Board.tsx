import {territories} from "../services/TerritoryService";
import Country from "./map/countries/Country";

interface BoardProps {
    selectCountry: (e: string, country: string) => void;
}

export default function Board({selectCountry}: BoardProps) {
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <svg xmlns="http://www.w3.org/2000/svg"
                 width={'70%'} height={'70%'}
                 viewBox={`0 0 ${1024} ${792}`}>
                <g id="map" fill="none" strokeWidth="1.5">
                    {Object.entries(territories).map((props) => (
                        <g key={props[0]} stroke={props[1].strokeColor} fill={props[1].fillColor}
                           visibility="visible">
                            <Country drawPath={props[1].drawPath} name={props[0]} _troopCount={10}
                                     callback={selectCountry}/>
                        </g>
                    ))}
                </g>
            </svg>
        </div>
    )
}
