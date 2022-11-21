import React, {useEffect, useRef, useState} from 'react';
import Path from './Path';
import "./Path.css";

interface CountryProps {
    d: string;
    name: string;
    _armies: number;
    callback: (e: any, country: string) => void;
}

/**
 * A country on the map
 */
export default function Country({d, name, _armies, callback}: CountryProps) {
    const ref = useRef<SVGPathElement>(null);
    const [centerX, setCenterX] = useState(0);
    const [centerY, setCenterY] = useState(0)
    const [armyPieces, setArmyPieces] = useState(0);

    useEffect(() => {
        if (ref.current) {
            let bo = ref.current.getBBox();
            setCenterX(bo.x + (bo.width / 2));
            setCenterY(bo.y + (bo.height / 2));
        }
    }, [])


    return <g>
        <Path callback={callback} name={name} d={d} innerRef={ref}/>
        <circle cx={centerX + 4} cy={centerY - 6} r={10}/>
        <text className="country-name" x={centerX} y={centerY}>{armyPieces}</text>
    </g>
}