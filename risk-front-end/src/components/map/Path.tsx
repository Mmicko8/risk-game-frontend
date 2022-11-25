import './Path.css';
import {LegacyRef} from "react";

interface PathRouteProps {
    d: string;
    name: string;
    callback: (e: any, country: string) => void;
    innerRef: LegacyRef<SVGPathElement> | undefined;
}

/**
 * specific shape of the Territory
 */
export default function Path({d, name, callback, innerRef}: PathRouteProps) {
    return <path
        ref={innerRef}
        className="territory"
        id={name}
        d={d}
        onClick={(e) => callback(e, name)}/>
}
