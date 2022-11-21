import Britian from '../countries/eu/britian';
import Iceland from '../countries/eu/iceland';
import NorthEurope from '../countries/eu/north';
import Scandinavia from '../countries/eu/scandinavia';
import SouthEurope from '../countries/eu/south';
import Ukraine from '../countries/eu/ukraine';
import WestEurope from '../countries/eu/west';

interface ContinentProps {
    selectCountry: (e: any, country: string) => void
}

export default function Europe({selectCountry}: ContinentProps) {
    return <g id="Europe" stroke="rgb(148,130,173)" fill="#CEBADE" visibility="visible">
        <Britian callback={selectCountry}/>
        <Iceland callback={selectCountry}/>
        <NorthEurope callback={selectCountry}/>
        <Scandinavia callback={selectCountry}/>
        <SouthEurope callback={selectCountry}/>
        <Ukraine callback={selectCountry}/>
        <WestEurope callback={selectCountry}/>
    </g>;
}

