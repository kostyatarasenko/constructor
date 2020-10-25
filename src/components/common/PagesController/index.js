import React from 'react';
import PlusPage from '@assets/images/plus-page.svg';

const PagesController = ({ pages, onCreatePage }) => {
  return (
    <div className="pages-controller">
      <div className="pages-blocks">
        {pages.map(({ id, name }) => (
          <div key={id} className="page-block">
            {name}
          </div>
        ))}
      </div>
      <div onClick={onCreatePage} className="create-page-block">
        <img src={PlusPage} alt="" />
      </div>
    </div>
  );
};

export default PagesController;
