import EastAustralia from '../countries/au/east';
import NewGuinea from '../countries/au/guinea';
import WestAustralia from '../countries/au/west';
import Indonesia from '../countries/au/indonesia';

interface ContinentProps {
    selectCountry: (e: any, country: string) => void
}

export default function Australia({selectCountry}: ContinentProps) {
    return <g id="Australia" stroke="rgb(214,81,99)" fill="#E78A94" visibility="visible">
        <EastAustralia callback={selectCountry}/>
        <NewGuinea callback={selectCountry}/>
        <WestAustralia callback={selectCountry}/>
        <Indonesia callback={selectCountry}/>
    </g>;
}

