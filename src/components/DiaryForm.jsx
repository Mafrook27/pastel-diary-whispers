
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Sparkles } from 'lucide-react';
import Spinner from './Spinner';

const DiaryForm = ({ onSubmit, isAnalyzing }) => {
  const [entry, setEntry] = useState('');
  const [charCount, setCharCount] = useState(0);
  const maxChars = 2000;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (entry.trim() && !isAnalyzing && entry.length <= maxChars) {
      onSubmit(entry.trim());
      setEntry('');
      setCharCount(0);
    }
  };

  const handleChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxChars) {
      setEntry(text);
      setCharCount(text.length);
    }
  };

  const placeholderTexts = [
    "Dear Diary... Tell me about your day, your thoughts, your feelings. I'm here to listen and understand. ✨",
    "What's on your mind today? Share your emotions, experiences, or anything you'd like to reflect on... 💭",
    "How are you feeling right now? Express yourself freely - every thought and emotion is valid here... 🌸",
    "Today I felt... Write about your experiences, both big and small. Your AI companion is ready to listen... 💖"
  ];

  const [currentPlaceholder] = useState(
    placeholderTexts[Math.floor(Math.random() * placeholderTexts.length)]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white/70 backdrop-blur-sm border-pink-100 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="block text-lg font-medium text-gray-700 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-pink-500" />
                  How are you feeling today?
                </label>
                <span className={`text-sm ${charCount > maxChars * 0.9 ? 'text-red-500' : 'text-gray-400'}`}>
                  {charCount}/{maxChars}
                </span>
              </div>
              
              <Textarea
                value={entry}
                onChange={handleChange}
                placeholder={currentPlaceholder}
                className="min-h-[140px] resize-none rounded-2xl border-pink-200 focus:border-pink-400 focus:ring-pink-300 placeholder:text-gray-400 text-base leading-relaxed"
                disabled={isAnalyzing}
              />
            </div>
            
            <div className="flex justify-end">
              {isAnalyzing ? (
                <div className="flex items-center space-x-3 bg-gradient-to-r from-pink-50 to-purple-50 px-6 py-3 rounded-xl">
                  <Spinner size="sm" message="" />
                  <span className="text-sm text-gray-600 font-medium">
                    AI is analyzing your entry with care...
                  </span>
                </div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={!entry.trim() || isAnalyzing || charCount > maxChars}
                    size="lg"
                    className="rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all duration-300 px-8 py-3 text-base font-medium shadow-lg hover:shadow-xl"
                  >
                    <motion.div
                      className="flex items-center space-x-2"
                      animate={entry.trim() ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <Send className="w-4 h-4" />
                      <span>Share with AI</span>
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
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
