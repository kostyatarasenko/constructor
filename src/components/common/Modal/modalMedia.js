import React, { useState, useCallback, useRef } from 'react';

import Button from '@components/common/Button';

import { convertToMegaBytes } from '@utils/sizeConvert';

import PreloadedMedia from '@assets/images/Modal/preloadedmedia.png';

const ModalMedia = ({
  onChooseImage,
  localization: {
    mediaTitle,
    inputFileTitle,
    inputFileSize,
  },
}) => {

  const [state, setState] = useState({
    info: '',
    image: PreloadedMedia,
    error: null,
  });
  const hiddenFileInput = useRef(null);

  const handleClickFile = useCallback(() => {
    hiddenFileInput.current.click();
  }, []);

  const handleChooseFile = useCallback((e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      if (convertToMegaBytes(file.size) < 5000) {
        setState({
          ...state,
          info: file.name,
          image: file.name,
          error: null,
        });
        onChooseImage(file.name);
      } else {
        setState({
          ...state,
          error: true,
        });
      }
    }
  }, [state]);

  const {
    info,
    image,
    error,
  } = state;

  return (
    <>
      <div className="modal-media-container">
        <div className="left-side">
          <div
            className="image-container"
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
        </div>
        <div className="right-side">
            <span className="media-title">
              {mediaTitle}
            </span>
          <Button
            className="fileButton"
            onClick={handleClickFile}
          >
            <span className="uploadText">
              {inputFileTitle}
            </span>
            <span className="fileSizeText">
              {inputFileSize}
            </span>
          </Button>
          <input
            className="hiddenFileInput"
            ref={hiddenFileInput}
            onChange={handleChooseFile}
            type="file"
            accept="image/*"
          />
          <span className="fileInfo">
            {info}
          </span>
          {
            error && (
              <span className="fileInfoError">
                Ошибка
              </span>
            )
          }
        </div>
      </div>
    </>
  );
};

export default ModalMedia;
