import { useState, useRef } from 'react';
import Country from '../country';


export default function Congo({ callback }) {
  const [coords,setCoords] = useState([[-5,-6],[-11,-12],[-11,-20],[4,-3],[4,-4],[6,-9],[2,0],[4,0],[6,0],[0,-1],[0,-2],[0,-3],[9,2],[9,2],[13,2],[1,-8],[2,-13],[0,-20],[4,-2],[5,-5],[10,-7],[1,-1],[1,-2],[1,-4],[7,-1],[11,-5],[17,-9],[4,11],[9,19],[16,29],[1,-1],[2,-2],[2,-3],[1,2],[2,4],[2,6],[6,0],[11,1],[16,2],[1,11],[-9,11],[-10,19],[-2,0],[-3,0],[-4,0],[-1,4],[-2,11],[-7,12],[1,5],[1,11],[2,17],[-1,2],[-2,3],[-3,5],[-1,0],[-2,0],[-3,0],[1,5],[1,11],[2,16],[-2,0],[-3,0],[-4,0],[0,-1],[0,-3],[0,-4],[-23,-5],[-15,-2],[-21,-20],[-2,0],[-4,-1],[-6,-1],[0,1],[-1,2],[-1,3],[-1,0],[-3,0],[-4,1],[-1,-4],[-1,-4],[-4,-9],[-8,-1],[-9,-2],[-15,-3]]);
  const [armies,setArmies] = useState(1);
  const name = 'Congo';
  const marks = [[473,502]];
  const c = coords.map((coord) => coord.join(',')).join(' ');

  return <Country armies={armies} callback={callback} name={name} d={`M${marks[0].join(' ')}c${c}z`} />;
}
