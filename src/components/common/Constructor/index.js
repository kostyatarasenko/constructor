import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';

import Block from '@components/Block';

import EmptyConstructor from '@assets/images/Constructor/empty-constructor.svg';

const Constructor = ({ pageIndex, onStateChange, pageState }) => {
  debugger;
  const [blocks, setBlocks] = useState(pageState);

  const handleDrop = useCallback((name) => {
    setBlocks([...blocks, {
      id: blocks.length ? blocks[blocks.length - 1].id + 1 : 0,
      type: name,
      content: null,
    }]);
  }, [blocks]);

  const [, drop] = useDrop({
    accept: ['image', 'audio', 'video', 'editor', 'action-editor', 'link', 'vocabulary', 'test', 'exercise'],
    drop({ type }) {
      handleDrop(type);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      draggingColor: monitor.getItemType(),
    }),
  });

  useEffect(() => {
    setBlocks(pageState);
  }, [blocks]);

  const handleCopyBlock = (type, content) => {
    setBlocks([...blocks, {
      id: blocks[blocks.length - 1].id + 1,
      type,
      content,
    }]);
  };

  useEffect(() => {
    onStateChange(blocks, pageIndex);
  }, [blocks, pageIndex]);

  const handleChangeStateBlock = (id, state) => {
    setBlocks(blocks.map((block) => {
      if (id !== block.id) {
        return block;
      } else {
        return ({
          id,
          type: block.type,
          content: state,
        });
      }
    }));
  };

  const handleDeleteBlock = (id) => {
    setBlocks(blocks.filter(({ id: blockId }) => blockId !== id));
  };

  return (
    <div ref={drop} id="constructor">
      {
        !blocks.length ? (
          <div className="empty-constructor-container">
            <img src={EmptyConstructor} alt=""/>
            <span className="empty-constructor-message">
              С заботой об учениках и образовании

              текст какой-тович
            </span>
          </div>
        ) : (
          blocks.map(({ id, type, content }) => (
            <Block
              key={id}
              id={id}
              actions={{
                onCopy: handleCopyBlock.bind({}, type, content),
                onDelete: handleDeleteBlock.bind({}, id),
              }}
              preloadedState={content}
              onStateChange={handleChangeStateBlock}
              type={type}
            />
          ))
        )
      }
    </div>
  );
};

export default Constructor;
