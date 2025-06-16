
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Clock, Brain, Heart, Sparkles } from 'lucide-react';
import MoodTag from './MoodTag';
import { formatDate } from '../utils/dateFormatter';

const EntryCard = ({ entry, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.01 }}
      layout
    >
      <Card className="bg-white/80 backdrop-blur-sm border-pink-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
        <CardHeader className="pb-4 bg-gradient-to-r from-pink-50/50 to-purple-50/50">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <p className="text-sm text-gray-600 font-medium">
                {formatDate(entry.timestamp)}
              </p>
            </div>
            {entry.analysis && (
              <MoodTag mood={entry.analysis.mood} />
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 p-6">
          {/* Original Entry */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-5 border border-gray-100"
          >
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-semibold">You</span>
              </div>
              <h4 className="text-sm font-semibold text-gray-700">Your thoughts</h4>
            </div>
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-base">
              {entry.text}
            </p>
          </motion.div>
          
          {/* AI Analysis */}
          {entry.analysis ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              {/* AI Summary */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mr-3">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-700 flex items-center">
                    AI Analysis
                    <Sparkles className="w-4 h-4 ml-1 text-blue-500" />
                  </h4>
                </div>
                <p className="text-gray-800 text-sm leading-relaxed">
                  {entry.analysis.summary}
                </p>
              </div>
              
              {/* Supportive Message */}
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-5 border border-rose-100">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center mr-3">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-700 flex items-center">
                    Supportive Message
                    <span className="ml-1">💝</span>
                  </h4>
                </div>
                <p className="text-gray-800 text-sm leading-relaxed">
                  {entry.analysis.support}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-5 border border-yellow-100"
            >
              <div className="flex items-center justify-center space-x-2">
                <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-yellow-700 font-medium">
                  AI is analyzing your entry...
                </span>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EntryCard;
