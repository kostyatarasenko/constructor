import React, { useState, useEffect, useRef } from 'react';
import Dropdown from 'rc-dropdown';

import ArrowUp from '@assets/images/blocks/Editor/arrow-up.svg';
import ArrowDown from '@assets/images/blocks/Editor/arrow-down.svg';
import Variant1 from '@assets/images/blocks/Exercise/variant1.svg';
import Variant2 from '@assets/images/blocks/Exercise/variant2.svg';
import Variant3 from '@assets/images/blocks/Exercise/variant3.svg';
import Variant4 from '@assets/images/blocks/Exercise/variant4.svg';
import Info from '@assets/images/blocks/Exercise/info.svg';
import ReactTooltip from 'react-tooltip';

const ExerciseBlock = ({ onStateChange, id, preloadedState }) => {
  const ref = useRef(null);
  const initialState = {
    variant: 1,
  };

  const [state, setState] = useState(preloadedState || initialState);

  useEffect(() => {
    onStateChange(id, state);
  }, [state]);
  return (
    <div className="aaa">
      <Dropdown
        trigger="click"
        prefixCls="exercise-text-open rc-dropdown"
        overlay={(
          <div className="exercise-dropdown">
            <div className="left-side">
              <div>
                <span className="exercise-type-selector-text">
                  Выберите тип упражнения
                </span>
                <div
                  className="exercise-type-image-container"
                  onClick={() => {
                    setState({
                      ...state,
                      variant: 1,
                    })
                  }}
                >
                  <img style={{ border: state.variant === 1 ? '1px solid #2C82FF' : '', borderRadius: 8 }} src={Variant1} alt=""/>
                  <span style={{ color: state.variant === 1 ? '#2C82FF' : '' }}>Перенести слова\выражения в пропуски</span>
                </div>
                <div
                  className="exercise-type-image-container"
                  onClick={() => {
                    setState({
                      ...state,
                      variant: 2,
                    })
                  }}
                >
                  <img style={{ border: state.variant === 2 ? '1px solid #2C82FF' : '', borderRadius: 8 }} src={Variant2} alt=""/>
                  <span style={{ color: state.variant === 2 ? '#2C82FF' : '' }}>Вставьте слово в пропуски</span>
                </div>
                <div
                  className="exercise-type-image-container"
                  onClick={() => {
                    setState({
                      ...state,
                      variant: 3,
                    })
                  }}
                >
                  <img style={{ border: state.variant === 3 ? '1px solid #2C82FF' : '', borderRadius: 8 }} src={Variant3} alt=""/>
                  <span style={{ color: state.variant === 3 ? '#2C82FF' : '' }}>Поставьте слово в нужную форму</span>
                </div>
                <div
                  className="exercise-type-image-container"
                  onClick={() => {
                    setState({
                      ...state,
                      variant: 4,
                    })
                  }}
                  style={{
                    marginBottom: 8
                  }}
                >
                  <img style={{ border: state.variant === 4 ? '1px solid #2C82FF' : '', borderRadius: 8 }} src={Variant4} alt=""/>
                  <span style={{ color: state.variant === 4 ? '#2C82FF' : '' }}>Составьте предложение из слов</span>
                </div>
              </div>
            </div>
            <img src={ArrowUp} alt=""/>
          </div>
        )}
      >
        <div className="exercise-type-selector">
          <span className="exercise-type-selector-text">
            Выберите тип упражнения
          </span>
          <img src={ArrowDown} alt=""/>
        </div>
      </Dropdown>
      <input
        type="text"
        className="exercise-input"
        placeholder="Условие упражнения"
      />
      <div className="exercise-input-container">
        <img data-tip={(() => {
          if (state.variant === 1) {
            return 'Запишите в квадратных скобках правильное слово\\выражение\n' +
              '\n<br />' +
              'Me [llamo] Alejandro Makovski, soy de Moscú.';
          } else if (state.variant === 2) {

          } else if (state.variant === 3) {

          } else if (state.variant === 4) {

          }
        })()} src={Info} alt=""/>
        <input
          type="text"
          className="exercise-input"
          placeholder="Текст упражнения"
        />
      </div>
      <ReactTooltip
        style={{
          textALight: 'left'
        }}
        className="course-description-tooltip"
        arrowColor="transparent"
        place="right"
        multiline
      />
    </div>
  );
};

export default ExerciseBlock;
