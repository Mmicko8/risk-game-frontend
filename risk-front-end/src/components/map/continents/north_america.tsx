import Alaska from '../countries/na/alaska';
import Alberta from '../countries/na/alberta';
import CentralUS from '../countries/na/central';
import EastUS from '../countries/na/east';
import Greenland from '../countries/na/greenland';
import Northwest from '../countries/na/northwest';
import Ontario from '../countries/na/ontario';
import WestUS from '../countries/na/west';
import Quebec from '../countries/na/quebec';

interface ContinentProps {
    selectCountry: (e: any, country: string) => void

}

export default function NorthAmerica({selectCountry}: ContinentProps) {
    return <g id="North America" stroke="rgb(201,155,50)" fill="#EFCB73" visibility="visible">
        <Alaska callback={selectCountry}/>
        <Alberta callback={selectCountry}/>
        <CentralUS callback={selectCountry}/>
        <EastUS callback={selectCountry}/>
        <Greenland callback={selectCountry}/>
        <Northwest callback={selectCountry}/>
        <Ontario callback={selectCountry}/>
        <WestUS callback={selectCountry}/>
        <Quebec callback={selectCountry}/>
    </g>;
}

