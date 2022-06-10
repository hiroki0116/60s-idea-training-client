import React from 'react'
import { motion } from 'framer-motion';
import { fadeInRight } from 'utils/animations';

const MotionDiv = ({children}) => {
  return (
    <motion.div
        initial='initial'
        animate='animate'
        variants={fadeInRight}
    >
        {children}
    </motion.div>
  )
}

export default MotionDiv