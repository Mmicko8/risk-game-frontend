import React, {useState, useEffect, useRef} from 'react';
import Path from './path';

interface CountryProps {
    d: string;
    name: string;
    _armies: number;
    callback: (e: any, country: string ) => void;
}

/**
 * A country on the map
 */
export default function Country({d, name, _armies,callback}: CountryProps) {

    return <g>
        <Path callback={callback} name={name} d={d}/>
    </g>
}