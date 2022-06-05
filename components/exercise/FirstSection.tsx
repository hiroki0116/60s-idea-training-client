import { useState,useContext } from 'react';
import {ExerciseContext} from 'context/exerciseContext';
import CenterSpin from 'components/Layout/CenterSpin';
import { Tag } from 'antd';
import moment from 'moment';

const FirstSection = () => {
    const { showFirstSection } = useContext(ExerciseContext);
  return (
    showFirstSection ? (
        <div>
            First Section
        </div>
      ) : null
  )
}

export default FirstSection