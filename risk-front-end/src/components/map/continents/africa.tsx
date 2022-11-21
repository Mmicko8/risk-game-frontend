import EastAfrica from "../countries/af/east";
import Egypt from "../countries/af/egypt";
import Congo from "../countries/af/congo";
import Madagascar from "../countries/af/madagascar";
import SouthAfrica from "../countries/af/south";
import NorthAfrica from "../countries/af/north";

interface ContinentProps {
    selectCountry: (e: any, country: string) => void

}


export default function Africa({selectCountry}: ContinentProps) {
    return <g id="Africa" stroke="rgb(198,138,49)" fill="#CEA252" visibility="visible">
        <EastAfrica callback={selectCountry}/>
        <Egypt callback={selectCountry}/>
        <Congo callback={selectCountry}/>
        <Madagascar callback={selectCountry}/>
        <SouthAfrica callback={selectCountry}/>
        <NorthAfrica callback={selectCountry}/>
    </g>;
}

