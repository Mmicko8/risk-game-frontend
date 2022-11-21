import Afghanistan from '../countries/as/afganistan';
import India from '../countries/as/india';
import China from '../countries/as/china';
import Irkutsk from '../countries/as/irkutsk';
import Japan from '../countries/as/japan';
import Kamchatka from '../countries/as/kamchatka';
import MiddleEast from '../countries/as/middle';
import Mongolia from '../countries/as/mongolia';
import Siam from '../countries/as/siam';
import Siberia from '../countries/as/siberia';
import Ural from '../countries/as/ural';
import Yakutsk from '../countries/as/yakutsk';

interface ContinentProps {
    selectCountry: (e: any, country: string ) => void
}

export default function asia({selectCountry}: ContinentProps) {
    return <g id="Asia" stroke="rgb(156,195,90)" fill="#BDDB8C" visibility="visible">
        <Afghanistan callback={selectCountry}/>
        <India callback={selectCountry}/>
        <Irkutsk callback={selectCountry}/>
        <Kamchatka callback={selectCountry}/>
        <MiddleEast callback={selectCountry}/>
        <Mongolia callback={selectCountry}/>
        <Siam callback={selectCountry}/>
        <China callback={selectCountry}/>
        <Japan callback={selectCountry}/>
        <Siberia callback={selectCountry}/>
        <Ural callback={selectCountry}/>
        <Yakutsk callback={selectCountry}/>
    </g>;
}

