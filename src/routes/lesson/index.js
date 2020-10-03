import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DragCard from '@components/common/DragCard';
import Constructor from '@components/common/Constructor';

import atextIcon from '@assets/icons/atext.svg';

const Lesson = () => {
  const actions = [{
    type: 'duplicate-action',
    name: 'Иконка',
    icon: atextIcon,
  }];

  return (
    <DndProvider backend={HTML5Backend}>
      <div id="lesson">
        <aside id="actions">
          {
            actions.map(({ type, name, icon }) => (
              <DragCard
                key={type}
                type={type}
                name={name}
                icon={icon}
              />
            ))
          }
        </aside>
        <Constructor />
        <aside id="additional-actions">
          Lorem
        </aside>
      </div>
    </DndProvider>
  );
};

export default Lesson;
