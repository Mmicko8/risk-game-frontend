import EastAustrailia from '../countries/au/east';
import NewGuinea from '../countries/au/guinea';
import WestAustrailia from '../countries/au/west';
import Indonesia from '../countries/au/indonesia';

interface ContinentProps {
    selectCountry: (e: any, country: string) => void
}

export default function Austrailia({selectCountry}: ContinentProps) {
    return <g id="Austrailia" stroke="rgb(214,81,99)" fill="#E78A94" visibility="visible">
        <EastAustrailia callback={selectCountry}/>
        <NewGuinea callback={selectCountry}/>
        <WestAustrailia callback={selectCountry}/>
        <Indonesia callback={selectCountry}/>
    </g>;
}

