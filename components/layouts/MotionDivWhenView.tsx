import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AnimationStartsWhenInView = ({
  children,
  variants,
  type,
}: {
  children?: JSX.Element | JSX.Element[];
  variants: any;
  type?: string;
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      whileHover={type === "icon" ? { scale: 1.04 } : null}
      transition={{
        type: "spring",
        stiffness: Math.floor(getRandomArbitrary(40, 100)),
      }}
      initial="hidden"
      variants={variants}
      className="m-auto"
    >
      {children}
    </motion.div>
  );
};

export default AnimationStartsWhenInView;
