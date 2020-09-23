import React from 'react';
import { useTranslation } from 'react-i18next';

import Navbar from '@components/Navbar';
import Tabs from '@components/common/Tabs';

import CoursesTab from './coursesTab';

const Courses = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar
        title={t('CoursesRoute.Title')}
      />
      <>
        <Tabs
          tabs={[{
            index: 0,
            component: <CoursesTab />,
            name: t('CoursesRoute.Tab1'),
          }]}
        />
      </>
    </>
  );
};

export default Courses;
