import React, { useContext } from 'react';
import { GrudgeContext } from './GrudgeContext';

import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

const Application = () => {
  const { undo, isPast } = useContext(GrudgeContext);

  return (
    <div className="Application">
      <NewGrudge />
      <section>
        <button disabled={!isPast} onClick={undo}>
          Undo
        </button>
        <button>Redo</button>
      </section>
      <Grudges />
    </div>
  );
};

export default Application;
