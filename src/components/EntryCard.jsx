
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import MoodTag from './MoodTag';
import { formatDate } from '../utils/dateFormatter';

const EntryCard = ({ entry, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="bg-white/70 backdrop-blur-sm border-pink-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-2">
                {formatDate(entry.timestamp)}
              </p>
              {entry.analysis && (
                <MoodTag mood={entry.analysis.mood} />
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-gray-50/80 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Your Entry:</h4>
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {entry.text}
            </p>
          </div>
          
          {entry.analysis && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <span className="mr-2">🤖</span>
                  AI Analysis:
                </h4>
                <p className="text-gray-800 text-sm leading-relaxed">
                  {entry.analysis.summary}
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <span className="mr-2">💝</span>
                  Supportive Message:
                </h4>
                <p className="text-gray-800 text-sm leading-relaxed">
                  {entry.analysis.support}
                </p>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EntryCard;
