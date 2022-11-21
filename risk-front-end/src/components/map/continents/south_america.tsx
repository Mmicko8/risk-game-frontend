import Argentina from '../countries/sa/argentina';
import Brazil from '../countries/sa/brazil';
import Peru from '../countries/sa/peru';
import Venezuela from '../countries/sa/venezuela';

interface ContinentProps {
    selectCountry: (e: any, country: string) => void
}

export default function SouthAmerica({selectCountry}: ContinentProps) {
    return <g id="South America" stroke="rgb(222,121,82)" fill="#E79273" visibility="visible">
        <Argentina callback={selectCountry}/>
        <Brazil callback={selectCountry}/>
        <Peru callback={selectCountry}/>
        <Venezuela callback={selectCountry}/>
    </g>;
}

