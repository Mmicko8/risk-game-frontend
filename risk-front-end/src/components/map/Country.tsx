import React, {useEffect, useRef, useState} from 'react';
import Path from './Path';
import "./Path.css";

interface CountryProps {
    drawPath: string;
    name: string;
    _troopCount?: number;
    callback: (e: any, country: string) => void;
    xOffset: number;
    yOffset: number;
}

/**
 * A country on the map
 */
export default function Country({drawPath, name, _troopCount=0, callback, xOffset, yOffset}: CountryProps) {
    const ref = useRef<SVGPathElement>(null);
    const [centerX, setCenterX] = useState(0);
    const [centerY, setCenterY] = useState(0)
    const [troopCount, setTroopCount] = useState(_troopCount);

    useEffect(() => {
        if (ref.current) {
            let bo = ref.current.getBBox();
            setCenterX(bo.x + (bo.width / 2));
            setCenterY(bo.y + (bo.height / 2));
        }
    }, [])

    const digitOffset = troopCount > 9 ? -5 : 0;

    return <g>
        <Path callback={callback} name={name} d={drawPath} innerRef={ref}/>
        <circle cx={centerX + xOffset + 4} cy={centerY + yOffset - 6} r={11}/>
        <text className="country-name" x={centerX + xOffset + digitOffset} y={centerY + yOffset}>{troopCount}</text>
    </g>
}
