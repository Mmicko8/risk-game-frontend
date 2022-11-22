import Australia from "./map/continents/australia";
import Africa from "./map/continents/africa";
import Seas from "./map/continents/seas";
import Europe from "./map/continents/europe";
import NorthAmerica from "./map/continents/north_america";
import SouthAmerica from "./map/continents/south_america";
import Asia from "./map/continents/asia";

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
                    <Seas/>
                    <Africa selectCountry={selectCountry}/>
                    <Asia selectCountry={selectCountry}/>
                    <Australia selectCountry={selectCountry}/>
                    <Europe selectCountry={selectCountry}/>
                    <NorthAmerica selectCountry={selectCountry}/>
                    <SouthAmerica selectCountry={selectCountry}/>
                </g>
            </svg>
        </div>
    )
}