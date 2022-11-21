import {useState} from 'react';
import Country from '../Country';

export default function SouthAfrica({callback}) {
    const [coords, setCoords] = useState([[6, 1], [7, 2], [15, 3], [3, 5], [3, 5], [4, 9], [1, -1], [3, -1], [4, -1], [0, -1], [1, -2], [1, -3], [2, 0], [4, 1], [6, 1], [6, 18], [-2, 15], [21, 20], [0, 1], [0, 3], [0, 4], [1, 0], [2, 0], [4, 0], [-1, -5], [-1, -11], [-2, -16], [1, 0], [2, 0], [3, 0], [1, -2], [2, -3], [3, -5], [0, 0], [1, 0], [2, 0], [2, 3], [5, 7], [7, 10], [0, 8], [0, 16], [0, 23], [2, 0], [3, 0], [5, 1], [0, -2], [0, -12], [2, -18], [5, -2], [10, -3], [16, -4], [0, 13], [2, 29], [-13, 33], [-1, 2], [-1, 2], [-6, 7], [-1, 9], [0, 19], [-10, 22], [-2, 13], [-2, 13], [-3, 18], [-1, 0], [-2, 0], [-3, 0], [0, 1], [0, 2], [0, 3], [-1, 0], [-2, 0], [-3, 0], [-7, 18], [-20, 18], [-39, 22], [-2, -1], [-4, -2], [-5, -2], [0, -2], [0, -3], [0, -4], [0, 0], [1, 0], [2, 0], [0, -10], [-1, -15], [-6, -24], [-1, -9], [-2, -12], [-5, -30], [-4, -11], [-8, -21], [-2, -31], [1, 0], [3, -1], [4, -1], [0, -8], [-1, -16], [-1, -24], [1, 0], [2, -1], [3, -1], [0, -3], [0, -7], [-1, -11], [-1, 0], [-2, 0], [-3, 0], [0, 0], [0, -1], [0, -1]]);
    const c = coords.map((coord) => coord.join(',')).join(' ');
    return <Country callback={callback} name='SouthAfrica' d={`M473 502c${c}z`}/>
}