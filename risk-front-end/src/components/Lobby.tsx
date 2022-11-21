import {useTranslation} from 'react-i18next';
import Board from "./Board";
import {useState} from "react";


export default function Lobby() {

    const selectCountry = (e: any, country: string) => {
        console.log(e, country);
    };

    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg"
                 width={'70%'} height={'70%'}
                 viewBox={`0 0 ${1024} ${792}`}>
                <Board selectCountry={selectCountry}/>
            </svg>
        </div>
    );
}