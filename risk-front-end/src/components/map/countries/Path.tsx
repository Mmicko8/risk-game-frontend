import './Path.css';
import {LegacyRef, MutableRefObject, RefObject} from "react";

interface PathRouteProps {
    d: string;
    name: string;
    callback: (e: any, country: string ) => void;
    innerRef:  LegacyRef<SVGPathElement> | undefined;
}

/**
 * specific shape of the country
 */
export default function Path({d, name,callback,innerRef}: PathRouteProps) {
    return <path
        ref={innerRef}
        className="country"
        id={name}
        d={d}
        onClick={(e) => callback(e,name)}/>
}