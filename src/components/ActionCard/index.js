import React from 'react';
import Dropdown from 'rc-dropdown';

import Card from '@components/common/Card';
import Menu from '@components/common/Menu';

import rand from '@utils/rand';

import Pattern1 from '@assets/images/Constructor/pattern1.jpg';
import Pattern2 from '@assets/images/Constructor/pattern2.jpg';
import Pattern3 from '@assets/images/Constructor/pattern3.jpg';
import MoreHorizontal from '@assets/images/Constructor/more-horizontal.svg';

const patterns = [Pattern1, Pattern2, Pattern3];

const ActionCard = ({
  image = null,
  title = '',
  description = '',
  lessonsTitleText = '',
  lessonsCount = 0,
  actions,
  onClick,
}) => {
  const handleClickDropdown = (e) => {
    e.stopPropagation();
  };

  return (
    <Card
      className="big action"
      onClick={onClick}
    >
      <div className="card-image-container">
        <img src={image || patterns[rand(0, 2)]} alt="course" />
      </div>
      <div className="card-description-container">
        <span className="card-title">
          {title}
        </span>
        <span className="card-description">
          {description}
        </span>
      </div>
      <div className="card-footer-container">
        {
          lessonsCount ? (
            <span className="lessons-title">
              {lessonsTitleText} <b className="lessons-count">{lessonsCount}</b>
            </span>
          ) : null
        }
        <Dropdown
          trigger="click"
          overlay={(
            <Menu actions={actions} />
          )}
          animation="slide-up"
        >
          <div
            className="dropdown-trigger-container"
            onClick={handleClickDropdown}
          >
            <img src={MoreHorizontal} alt="more-horizontal" />
          </div>
        </Dropdown>
      </div>
    </Card>
  );
};

export default ActionCard;