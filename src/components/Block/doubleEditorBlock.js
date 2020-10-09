import React, { useState, useEffect } from 'react';
import { EditorState } from 'draft-js';

import RichEditorExample from '@components/DoubleTextEditor';

import Button from '@components/common/Button';

import Cross from '@assets/images/blocks/cross.svg';
import Eye from '@assets/images/blocks/eye.svg';
import EyeOff from '@assets/images/blocks/eye-off.svg';

const EditorBlock = ({ onStateChange, id, preloadedState, onClickDelete, onClickCopy }) => {
  const initialState = {
    editorState: EditorState.createEmpty(),
  };

  const [state, setState] = useState(preloadedState || initialState);

  useEffect(() => {
    onStateChange(id, state);
  }, [state]);

  return (
    <div className="aaa">
      <RichEditorExample
        onClickCopy={onClickCopy}
        onClickDelete={onClickDelete}
      />
    </div>
  );
};

export default EditorBlock;
