import Austrailia from "./map/continents/austrailia";
import Africa from "./map/continents/africa";
import Seas from "./map/continents/seas";
import Europe from "./map/continents/europe";
import NorthAmeria from "./map/continents/north_america";
import SouthAmeria from "./map/continents/south_america";
import Asia from "./map/continents/asia";

export default function Board({ selectCountry, countries }){
    return(

         <g id="map" fill="none" strokeWidth="1.5">
            <Seas/>
            <Africa selectCountry={ selectCountry } countries={ countries } />
            <Asia selectCountry={ selectCountry } countries={ countries } />
            <Austrailia selectCountry={ selectCountry } countries={ countries } />
            <Europe selectCountry={ selectCountry } countries={ countries } />
            <NorthAmeria selectCountry={ selectCountry } countries={ countries } />
            <SouthAmeria selectCountry={ selectCountry } countries={ countries } />
        </g>
    )
}