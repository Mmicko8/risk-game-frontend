import { useState } from 'react';
import Country from '../Country';

export default function Argentina({ callback }) {
  const [coords,setCoords] = useState([[]]);
  const c = coords.map((coord) => coord.join(',')).join(' ');
  return <Country callback={callback} name='Argentina' d={`M227 487c1,0 3,-1 5,-2 0,2 1,5 1,8 6,2 5,8 10,10 1,-2 2,-4 3,-5 1,0 2,-1 3,-1 3,4 4,3 9,1 0,1 0,2 0,3 1,0 3,0 5,0 4,7 9,7 16,10 -1,4 -2,7 -4,11 4,-1 8,-1 12,-2 2,-4 2,-4 5,-6 1,1 1,2 2,3 -4,3 -10,8 -11,13 2,0 4,0 7,0 0,2 0,2 0,6 5,1 6,4 10,8 0,2 0,2 -3,2 0,1 0,2 -1,4 -8,3 -12,-1 -19,-1 5,5 5,5 7,8 0,0 1,0 1,-1 0,3 0,6 0,8 -3,2 -13,3 -16,5 -1,6 -1,6 -2,9 -2,0 -4,0 -6,0 0,-1 -1,-1 -1,-2 0,1 0,3 0,4 0,1 1,2 2,3 -3,1 -3,1 -3,2 1,0 2,0 2,0 0,1 0,2 0,3 0,0 -1,0 -2,0 0,1 0,2 1,3 -4,4 -4,4 -4,9 1,0 2,1 3,1 -1,3 -1,5 -1,8 -1,0 -2,1 -3,1 1,3 -2,8 -2,11 1,1 3,3 4,4 0,1 -1,1 -2,2 1,1 1,2 1,3 1,0 2,0 3,0 0,1 0,2 0,3 6,3 12,6 18,10 -14,4 -13,3 -26,0 1,-1 1,-1 1,-2 -1,0 -2,0 -3,0 0,-2 0,-3 0,-4 -2,0 -4,0 -5,0 0,-1 0,-2 0,-3 0,0 -1,1 -2,1 -1,-1 -3,-1 -5,-2 0,-2 0,-3 0,-4 -9,-5 -9,-14 -10,-23 -3,0 -3,0 -4,-2 1,-1 1,-2 1,-3 -1,0 -1,0 -2,0 0,-1 0,-3 0,-4 2,0 2,0 2,-1 -1,0 -1,0 -2,0 0,-2 0,-4 0,-6 1,0 2,0 4,0 0,-4 0,-9 0,-13 -1,0 -2,-1 -3,-1 5,-28 6,-61 4,-89 M309 631c-2,0 -3,-1 -4,-2 -1,-3 -1,-6 -1,-9 7,-7 9,-5 18,-4 0,1 0,3 1,5 -6,2 -7,3 -10,9 -2,1 -3,1 -4,1z M295 630c-1,-2 -1,-2 -4,-3 0,0 0,-1 0,-2 1,0 2,-1 4,-1 -1,-1 -2,-3 -3,-4 3,-2 6,-3 9,-4 0,3 0,7 1,10 -3,3 -3,3 -7,4z`} />
}
