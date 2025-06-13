
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
      className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-10"
    >
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <motion.h1 
          className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
        >
          My AI Diary 💖
        </motion.h1>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500">
              <AvatarFallback className="text-white text-sm font-semibold">
                {getUserInitials(user?.email)}
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:block text-sm text-gray-600 max-w-[150px] truncate">
              {user?.email}
            </span>
          </div>
          
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="rounded-full border-pink-200 text-pink-600 hover:bg-pink-50 hover:border-pink-300 transition-all duration-200"
          >
            Logout
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
