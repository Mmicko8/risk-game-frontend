import {useTranslation} from 'react-i18next';
import Board from "./Board";
import {useState} from "react";


export default function Lobby() {
    const {t} = useTranslation();
    const [ countries, setCountries ] = useState([]);

    const selectCountry = (e: string, country: string) => {
    };

    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg"
                 width={'70%'} height={'70%'}
                 viewBox={`0 0 ${1024} ${792}`}>
                <Board selectCountry={selectCountry} countries={countries}/>
            </svg>
        </div>
    );
}