
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getUserInitials = (email) => {
    return email ? email.charAt(0).toUpperCase() : 'U';
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-md border-b border-pink-100 sticky top-0 z-50 shadow-sm"
    >
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div 
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            My AI Diary
          </h1>
        </motion.div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-full px-4 py-2">
            <Avatar className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500">
              <AvatarFallback className="text-white text-sm font-semibold">
                {getUserInitials(user?.email)}
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:block text-sm text-gray-700 max-w-[150px] truncate font-medium">
              {user?.email}
            </span>
          </div>
          
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="rounded-full border-pink-200 text-pink-600 hover:bg-pink-50 hover:border-pink-300 transition-all duration-200 hover:scale-105"
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
