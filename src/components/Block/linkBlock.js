import React, { useEffect, useState } from 'react';

import Center from '@assets/images/blocks/Link/centered-icon.svg';
import Left from '@assets/images/blocks/Link/left-icon.svg';

const LinkBlock = ({ onStateChange, id, preloadedState, actionsRef }) => {
  const initialState = {
    align: 'center',
    link: '',
    name: '',
  };

  const [state, setState] = useState(preloadedState || initialState);
  useEffect(() => {
    const center = document.createElement('div');
    center.innerHTML = `<img class="link-left-icon" style="margin-right: 20px" src=${Left} /><img class="link-center-icon" src=${Center} />`;
    center.style.marginRight = '60px';
    if (!actionsRef.current.children.length) {
      actionsRef.current.append(center);
    }
    document.querySelector('.link-left-icon').addEventListener('click', () => {
      setState((prevState) => ({
        ...prevState,
        align: 'left',
      }));
    });
    document.querySelector('.link-center-icon').addEventListener('click', () => {
      setState((prevState) => ({
        ...prevState,
        align: 'center',
      }));
    });
  }, [actionsRef.current]);

  useEffect(() => {
    onStateChange(id, state);
  }, [state]);

  return (
    <div className="aaa">
      <textarea
        className="block-description-area-link"
        placeholder="Вставьте ссылку"
        onChange={(e) => {
          setState({
            ...state,
            link: e.target.value,
          })
        }}
        style={{
          textDecoration: state.link ? 'underline' : 'none'
        }}
        value={state.link}
      />
      <textarea
        className="block-description-area-link"
        placeholder="Название ссылки"
        onChange={(e) => {
          setState({
            ...state,
            name: e.target.value,
          })
        }}
        style={{
          textDecoration: state.name ? 'underline' : 'none',
          textAlign: state.align
        }}
        value={state.name}
      />
    </div>
  );
};

export default LinkBlock;