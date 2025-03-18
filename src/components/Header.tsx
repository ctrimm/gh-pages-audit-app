import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-blue-950/90 backdrop-blur-sm fixed w-full z-50">
      <div className="container mx-auto px-4 py-5 flex items-center justify-between">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img src="/logo.png" alt="Inspired Hospitality" className="h-8 w-auto" />
          <h1 className="text-xl font-semibold text-white">Inspired Hospitality</h1>
        </button>
        <nav>
          <Button 
            variant="ghost" 
            className="text-white hover:text-white/80"
            onClick={() => navigate('/signin')}
          >
            Sign In
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
