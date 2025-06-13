
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import DiaryForm from '../components/DiaryForm';
import EntryCard from '../components/EntryCard';
import { analyzeEntry } from '../utils/aiService';

const Home = () => {
  const [entries, setEntries] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleNewEntry = async (entryText) => {
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
    } catch (error) {
      console.error('Failed to analyze entry:', error);
    } finally {
      setIsAnalyzing(false);
    }
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
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-gray-800 mb-2"
            >
              Welcome to your safe space
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600"
            >
              Share your thoughts and let AI provide gentle insights and support
            </motion.p>
          </div>
          
          <DiaryForm onSubmit={handleNewEntry} isAnalyzing={isAnalyzing} />
          
          {entries.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                Your Journal Entries
              </h3>
              
              <div className="space-y-6">
                <AnimatePresence>
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
          
          {entries.length === 0 && !isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">📖</div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                Your diary is waiting
              </h3>
              <p className="text-gray-500">
                Write your first entry above to get started with AI-powered insights
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Home;
