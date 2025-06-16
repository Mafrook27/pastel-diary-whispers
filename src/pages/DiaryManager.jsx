
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  Calendar,
  BookOpen,
  Save,
  X
} from 'lucide-react';
import Header from '../components/Header';
import { formatDate } from '../utils/dateFormatter';

const DiaryManager = () => {
  const [entries, setEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEntry, setEditingEntry] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const { toast } = useToast();

  // Load entries from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem('diaryEntries');
    if (savedEntries) {
      try {
        const parsedEntries = JSON.parse(savedEntries);
        setEntries(parsedEntries);
      } catch (error) {
        console.error('Error loading entries:', error);
      }
    }
  }, []);

  // Save entries to localStorage
  const saveEntries = (updatedEntries) => {
    setEntries(updatedEntries);
    localStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));
  };

  // Create new entry
  const handleCreate = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in both title and content.",
        variant: "destructive",
      });
      return;
    }

    const newEntry = {
      id: Date.now(),
      title: formData.title.trim(),
      text: formData.content.trim(),
      timestamp: new Date(),
      analysis: null
    };

    const updatedEntries = [newEntry, ...entries];
    saveEntries(updatedEntries);
    setFormData({ title: '', content: '' });
    setIsCreating(false);
    
    toast({
      title: "Entry created! ✨",
      description: "Your diary entry has been saved successfully.",
    });
  };

  // Update existing entry
  const handleUpdate = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in both title and content.",
        variant: "destructive",
      });
      return;
    }

    const updatedEntries = entries.map(entry =>
      entry.id === editingEntry.id
        ? { 
            ...entry, 
            title: formData.title.trim(),
            text: formData.content.trim(),
            updatedAt: new Date()
          }
        : entry
    );

    saveEntries(updatedEntries);
    setEditingEntry(null);
    setFormData({ title: '', content: '' });
    
    toast({
      title: "Entry updated! ✏️",
      description: "Your changes have been saved successfully.",
    });
  };

  // Delete entry
  const handleDelete = (entryId) => {
    const updatedEntries = entries.filter(entry => entry.id !== entryId);
    saveEntries(updatedEntries);
    
    toast({
      title: "Entry deleted",
      description: "The diary entry has been removed.",
    });
  };

  // Start editing
  const startEdit = (entry) => {
    setEditingEntry(entry);
    setFormData({ title: entry.title || 'Untitled', content: entry.text });
    setIsCreating(false);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingEntry(null);
    setIsCreating(false);
    setFormData({ title: '', content: '' });
  };

  // Filter entries based on search
  const filteredEntries = entries.filter(entry =>
    entry.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (entry.title && entry.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Diary Manager
              </h1>
              <p className="text-gray-600 mt-2">Manage all your diary entries</p>
            </div>
            
            <Button
              onClick={() => setIsCreating(true)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Entry
            </Button>
          </div>

          {/* Search Bar */}
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search your diary entries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Create/Edit Form */}
          <AnimatePresence>
            {(isCreating || editingEntry) && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-pink-200">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-pink-500" />
                      {editingEntry ? 'Edit Entry' : 'Create New Entry'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      placeholder="Entry title..."
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="text-lg font-medium"
                    />
                    <Textarea
                      placeholder="Write your thoughts here..."
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="min-h-[200px] resize-none"
                    />
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={cancelEdit}>
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                      <Button 
                        onClick={editingEntry ? handleUpdate : handleCreate}
                        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {editingEntry ? 'Update' : 'Create'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Entries List */}
          <div className="space-y-4">
            {filteredEntries.length === 0 ? (
              <Card className="bg-white/70 backdrop-blur-sm">
                <CardContent className="text-center py-16">
                  <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-500 mb-2">
                    {searchTerm ? 'No matching entries found' : 'No diary entries yet'}
                  </h3>
                  <p className="text-gray-400">
                    {searchTerm ? 'Try a different search term' : 'Create your first entry to get started'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <AnimatePresence>
                {filteredEntries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <CardTitle className="text-lg">
                              {entry.title || 'Untitled Entry'}
                            </CardTitle>
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(entry.timestamp)}
                              {entry.updatedAt && (
                                <span className="ml-2 text-xs">
                                  (Updated: {formatDate(entry.updatedAt)})
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => startEdit(entry)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(entry.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 line-clamp-3 leading-relaxed">
                          {entry.text}
                        </p>
                        {entry.analysis && (
                          <div className="mt-3 flex items-center gap-2">
                            <span className="text-xs text-gray-500">Mood:</span>
                            <span className="px-2 py-1 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full text-xs font-medium text-purple-700 capitalize">
                              {entry.analysis.mood}
                            </span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default DiaryManager;
