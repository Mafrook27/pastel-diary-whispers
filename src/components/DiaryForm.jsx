
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import Spinner from './Spinner';

const DiaryForm = ({ onSubmit, isAnalyzing }) => {
  const [entry, setEntry] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (entry.trim() && !isAnalyzing) {
      onSubmit(entry.trim());
      setEntry('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white/60 backdrop-blur-sm border-pink-100 shadow-lg">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How are you feeling today?
              </label>
              <Textarea
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                placeholder="Dear Diary... Tell me about your day, your thoughts, your feelings. I'm here to listen and understand. ✨"
                className="min-h-[120px] resize-none rounded-xl border-pink-200 focus:border-pink-400 focus:ring-pink-300 placeholder:text-gray-400"
                disabled={isAnalyzing}
              />
            </div>
            
            <div className="flex justify-end">
              {isAnalyzing ? (
                <div className="flex items-center space-x-2">
                  <Spinner size="sm" message="" />
                  <span className="text-sm text-gray-600">AI is analyzing your entry...</span>
                </div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="submit"
                    disabled={!entry.trim() || isAnalyzing}
                    className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all duration-200 px-6"
                  >
                    <motion.span
                      animate={entry.trim() ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      Share with AI ✨
                    </motion.span>
                  </Button>
                </motion.div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DiaryForm;
