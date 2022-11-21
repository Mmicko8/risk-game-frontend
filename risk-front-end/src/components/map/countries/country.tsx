import React, {useState, useEffect, useRef} from 'react';
import Path from './path';

interface CountryProps {
    d: string;
    name: string;
    _armies: number;
}

export default function Country({d, name, _armies}: CountryProps) {
    return <g>
        <Path name={name} d={d}/>
    </g>
}