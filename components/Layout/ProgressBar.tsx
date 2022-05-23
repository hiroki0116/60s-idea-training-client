import { Fragment, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useRouter } from 'next/router';

export const progressBarVariants = {
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, easing: 'easeIn' }
  },
  initial: {
    opacity: 0,
    x: '-100%',
    transition: { duration: 0.3, easing: 'easeIn' }
  }
};

const PAGES = ['/employer/job-ad/post-job-ad/[id]/detail', '/employer/job-ad/post-job-ad/[id]/info'];

const ProgressBar = () => {
  const router = useRouter();
  const controls = useAnimation();

  useEffect(() => {
    controls.start((i) => ({
      ...progressBarVariants.animate,
      transition: { delay: (i + 1) * 0.3 }
    }));
  }, []);

  return (
    <div className="flex flex-row place-content-evenly items-center text-center text-16 w-2/3 mx-auto mt-4">
      {PAGES.map((path, i) => {
        const isCurr = path === router.pathname;
        const currentPageStyle = isCurr ? 'bg-ss-orange text-white' : 'text-gray-400';
        return (
          <Fragment key={i}>
            {i > 0 && <span className="flex-grow border-b-2 border-gray-300 border-solid my-5" />}
            <motion.div
              custom={i}
              initial={progressBarVariants.initial}
              animate={controls}
              className={`${currentPageStyle} p-2 rounded-xl w-10 h-10 border-2 border-gray-300 border-solid`}
            >
              {i + 1}
            </motion.div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default ProgressBar;
