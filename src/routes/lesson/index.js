import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DragCard from '@components/common/DragCard';

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
        <div id="constructor">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid amet aperiam at, debitis est et ex expedita illo illum ipsum iure magni molestias nihil nostrum placeat sit vel voluptate, voluptatem.
        </div>
        <aside id="additional-actions">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias architecto aspernatur dicta hic maiores non, vel. Commodi dolores ea eveniet, ipsum molestias nemo omnis reiciendis rem rerum sit soluta unde?
        </aside>
      </div>
    </DndProvider>
  );
};

export default Lesson;
