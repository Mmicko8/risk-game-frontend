interface PathRouteProps {
    d: string;
    name: string;
}

/**
 * specific shape of the country
 */
export default function Path({d, name}: PathRouteProps) {
    return <path
        className="country"
        id={name}
        d={d}/>
}