
import { motion } from 'framer-motion';
import { moodIcons, moodColors } from '../assets/moodIcons';

const MoodTag = ({ mood }) => {
  const icon = moodIcons[mood] || moodIcons.neutral;
  const colorClass = moodColors[mood] || moodColors.neutral;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${colorClass}`}
    >
      <span className="mr-1">{icon}</span>
      <span className="capitalize">{mood}</span>
    </motion.div>
  );
};

export default MoodTag;
