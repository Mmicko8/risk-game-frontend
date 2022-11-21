import {useState} from 'react';
import Country from '../Country';

export default function Yakutsk({callback}) {
    const [coords, setCoords] = useState([[]]);
    const c = coords.map((coord) => coord.join(',')).join(' ');
    return <Country callback={callback} name='Yakutsk'
                    d={`M797 166c-1,-8 -1,-18 -4,-26 1,-1 3,-2 4,-3 0,-1 0,-2 0,-3 -3,0 -6,-1 -8,-2 0,-1 0,-2 0,-3 -1,0 -2,0 -3,-1 0,-1 -1,-2 -1,-3 8,-2 15,-2 23,-2 2,-7 3,-13 8,-19 0,-5 -1,-6 -2,-12 1,0 2,-1 3,-2 -1,0 -3,0 -4,0 0,-1 0,-2 0,-3 7,0 19,-4 22,4 -1,1 -2,1 -3,1 1,2 1,3 1,4 5,0 8,4 13,4 1,-1 2,-3 3,-5 4,3 8,-1 10,2 3,0 5,-1 8,-1 -2,-1 -3,-2 -5,-2 0,-2 0,-4 -1,-5 3,0 6,0 8,-1 0,1 0,2 0,3 4,-2 4,-2 12,-3 0,1 0,2 0,3 -3,0 -3,0 -3,1 15,2 30,4 44,8 0,0 -1,1 -1,1 1,1 3,1 5,2 0,1 0,2 0,3 -1,1 -2,3 -3,5 -7,1 -12,5 -19,8 0,3 -1,7 -1,10 2,1 5,1 8,2 0,2 0,5 0,8 -2,0 -3,0 -4,0 -1,2 -2,4 -3,7 -2,0 -4,1 -6,2 -1,-1 -1,-2 -1,-3 -2,-1 -4,-1 -6,-2 -1,-2 -1,-4 -2,-5 -3,0 -5,1 -8,2 0,1 -1,2 -1,3 -2,0 -4,1 -7,1 -2,11 -11,13 -14,24 -5,-3 -6,-3 -8,-9 -3,0 -6,0 -8,-1 -1,-1 -1,-2 -1,-2 -19,-1 -21,1 -29,1 -2,2 -3,5 -5,7 -4,1 -8,2 -11,2z M857 87c0,-1 1,-3 2,-4 8,0 8,0 9,1 -5,1 -6,2 -11,3z M857 77c-2,7 -11,2 -15,0 0,-1 0,-2 0,-3 2,0 3,0 5,0 0,-1 0,-2 1,-3 1,1 2,1 3,1 0,1 0,2 1,3 1,1 3,1 5,2z M862 77c0,-2 0,-3 0,-4 4,0 4,0 10,4 -3,0 -7,0 -10,0z`}/>
}
