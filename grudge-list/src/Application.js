import React, { useContext } from 'react';
import { GrudgeContext } from './GrudgeContext';

import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

const Application = () => {
  const { undo, redo, isPast, isFuture } = useContext(GrudgeContext);

  return (
    <div className="Application">
      <NewGrudge />
      <section>
        <button className="full-width" disabled={!isPast} onClick={undo}>
          Undo
        </button>
        <button className="full-width" disabled={!isFuture} onClick={redo}>
          Redo
        </button>
      </section>
      <Grudges />
    </div>
  );
};

export default Application;
