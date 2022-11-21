import './Path.css';

interface PathRouteProps {
    d: string;
    name: string;
    callback: (e: any, country: string ) => void;
}

/**
 * specific shape of the country
 */
export default function Path({d, name,callback}: PathRouteProps) {
    return <path
        className="country"
        id={name}
        d={d}
        onClick={(e) => callback(e,name)}/>
}