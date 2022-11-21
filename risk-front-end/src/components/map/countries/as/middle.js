import {useState} from 'react';
import Country from '../Country';

export default function MiddleEast({callback,}) {
    const [coords, setCoords] = useState([[]]);
    const c = coords.map((coord) => coord.join(',')).join(' ');
    return <Country callback={callback} name='MiddleEast'
                    d={`M548 321c0,-1 -1,-3 -1,-4 4,-2 6,-2 10,-2 -3,4 -4,5 -9,6z M563 353c-1,-5 -3,-10 -4,-15 7,-8 4,-17 6,-28 -1,0 -1,-1 -2,-1 -3,2 -3,2 -11,3 0,0 -1,-1 -2,-2 -3,1 -6,2 -9,3 0,-1 -1,-2 -1,-3 -1,1 -3,1 -5,1 -2,-10 -5,-15 -5,-21 8,-15 0,0 8,-15 2,2 3,4 5,6 3,0 6,0 8,0 0,-1 0,-2 0,-3 9,0 15,-3 20,4 2,-1 6,0 14,-2 1,1 1,1 5,3 1,2 1,4 1,6 2,0 3,0 4,0 1,2 3,5 4,7 4,0 4,0 9,-2 1,8 1,8 2,11 7,1 11,2 17,0 0,-1 0,-3 0,-4 7,-1 13,-5 16,3 4,2 5,3 8,7 -1,6 -1,11 -1,16 1,0 2,0 3,1 1,6 3,13 4,19 1,0 2,0 3,0 -1,6 -4,10 -4,16 -5,1 -11,1 -16,2 0,-2 0,-4 0,-6 -2,0 -6,1 -15,0 -1,-1 -1,-2 -1,-3 -2,0 -3,0 -4,-1 -4,-12 -3,-15 -15,-12 0,4 2,6 4,10 1,0 2,0 3,0 2,4 4,8 6,12 1,-2 2,-3 3,-4 3,2 0,6 0,9 1,1 2,1 3,2 4,-3 8,-6 13,-10 3,8 7,9 10,15 -1,4 -3,7 -5,10 0,0 -1,-1 -1,-1 -1,3 -1,6 -2,9 -1,1 -3,1 -4,1 -4,14 -34,22 -45,26 0,-16 -6,-29 -16,-42 0,-9 -7,-18 -11,-27l0 0z`}/>
}
