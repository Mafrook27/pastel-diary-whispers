
import { motion } from 'framer-motion';
import { moodIcons, moodColors } from '../assets/moodIcons';

const MoodTag = ({ mood }) => {
  const icon = moodIcons[mood] || moodIcons.neutral;
  const colorClass = moodColors[mood] || moodColors.neutral;

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 500, 
        damping: 25,
        delay: 0.2 
      }}
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border-2 shadow-sm hover:shadow-md transition-all duration-200 ${colorClass}`}
    >
      <motion.span 
        className="mr-2 text-lg"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        {icon}
      </motion.span>
      <span className="capitalize font-medium">{mood}</span>
    </motion.div>
  );
};

export default MoodTag;
