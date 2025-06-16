
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import DiaryForm from '../components/DiaryForm';
import EntryCard from '../components/EntryCard';
import { analyzeEntry } from '../utils/aiService';
import { useToast } from '@/hooks/use-toast';

const Home = () => {
  const [entries, setEntries] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('diaryEntries');
    if (savedEntries) {
      try {
        setEntries(JSON.parse(savedEntries));
      } catch (error) {
        console.error('Error loading entries:', error);
      }
    }
  }, []);

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('diaryEntries', JSON.stringify(entries));
    }
  }, [entries]);

  const handleNewEntry = async (entryText) => {
    if (!entryText.trim()) {
      toast({
        title: "Empty entry",
        description: "Please write something before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    const newEntry = {
      id: Date.now(),
      text: entryText,
      timestamp: new Date(),
      analysis: null
    };
    
    // Add entry immediately (without analysis)
    setEntries(prev => [newEntry, ...prev]);
    
    try {
      // Get AI analysis
      const analysis = await analyzeEntry(entryText);
      
      // Update entry with analysis
      setEntries(prev => 
        prev.map(entry => 
          entry.id === newEntry.id 
            ? { ...entry, analysis }
            : entry
        )
      );

      toast({
        title: "Entry analyzed! ✨",
        description: "Your diary entry has been processed with AI insights.",
      });
    } catch (error) {
      console.error('Failed to analyze entry:', error);
      toast({
        title: "Analysis failed",
        description: "Your entry was saved, but AI analysis couldn't be completed.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearAllEntries = () => {
    setEntries([]);
    localStorage.removeItem('diaryEntries');
    toast({
      title: "Entries cleared",
      description: "All your diary entries have been removed.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
            >
              Welcome to your safe space 💖
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 text-lg max-w-2xl mx-auto"
            >
              Share your thoughts, emotions, and daily experiences. Let AI provide gentle insights and supportive guidance for your mental wellness journey.
            </motion.p>
          </div>
          
          {/* Diary Form */}
          <DiaryForm onSubmit={handleNewEntry} isAnalyzing={isAnalyzing} />
          
          {/* Entries Section */}
          {entries.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Your Journal Entries ({entries.length})
                </h3>
                {entries.length > 3 && (
                  <button
                    onClick={clearAllEntries}
                    className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                  >
                    Clear all entries
                  </button>
                )}
              </div>
              
              <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                  {entries.map((entry, index) => (
                    <EntryCard
                      key={entry.id}
                      entry={entry}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
          
          {/* Empty State */}
          {entries.length === 0 && !isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center py-16 space-y-6"
            >
              <div className="text-8xl mb-6">📓</div>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold text-gray-700">
                  Your diary awaits your first entry
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Start by sharing what's on your mind. Every thought matters, and our AI is here to provide gentle support and insights.
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Home;
