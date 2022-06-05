import { useState,useContext } from 'react';
import {ExerciseContext} from 'context/exerciseContext';
import CenterSpin from 'components/Layout/CenterSpin';
import { Tag } from 'antd';
import moment from 'moment';

const SubmitSection = () => {
    const { showSubmitSection } = useContext(ExerciseContext);
  return (
    showSubmitSection ? (
        <div>
            SubmitSection
        </div>
      ) : null
  )
}

export default SubmitSection