import React, { useContext } from 'react';
import EvolutionChart from '../features/EvolutionChart';
import { oSContext } from '../context/Context';


const Evolution = () => {
  const {challenges } = useContext(oSContext)
  return (
    <div>
      <h2>Evolution Overview</h2>
      <EvolutionChart challenges={challenges} />
    </div>
  );
};

export default Evolution;
