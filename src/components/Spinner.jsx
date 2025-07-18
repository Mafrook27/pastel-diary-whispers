
import { motion } from 'framer-motion';

const Spinner = ({ size = 'md', message = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <motion.div
        className={`${sizeClasses[size]} border-4 border-pink-200 border-t-pink-500 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 text-sm text-gray-600 font-medium"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export default Spinner;
