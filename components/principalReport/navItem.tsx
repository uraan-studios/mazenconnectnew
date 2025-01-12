import Link from 'next/link';
import { FC } from 'react';
import { Badge } from '../ui/badge';
import { motion } from 'framer-motion';

// Define a type for the icon prop (React component)
interface NavItemProps {
  active: boolean;
  href: string;
  icon: FC<React.SVGProps<SVGSVGElement>>; // Type for SVG icon component
  label: string;
  delay?: number; // Delay prop for staggered animation
}

const NavItem: FC<NavItemProps> = ({ active, href, icon: Icon, label, delay = 0 }) => {
  return (
    <Link href={href} className="flex flex-col items-center space-y-2 z-20 hover:scale-110 transition-all duration-300"> 
      <div className="relative flex items-center justify-center w-12 h-12 rounded-full z-20 overflow-hidden">
        {/* Shine effect overlay */}
        {active && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent z-10"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 1.5,
              ease: 'easeInOut',
              repeat: Infinity ,
              repeatDelay: 9,
              delay,
            }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
            }}
          />
        )}

        <div
          className={`relative flex items-center justify-center w-full h-full rounded-full transition-all duration-300 z-0 ${
            active ? 'bg-primary' : 'bg-secondary'
          }`}
        >
          <Icon
            className={`h-8 w-8 transition-all duration-300 ${
              active ? 'text-primary-foreground' : 'text-secondary-foreground'
            }`}
          />
        </div>
      </div>
      <Badge variant={active ? 'default' : 'outline'} className='text-xs'>{label}</Badge>
    </Link>
  );
};

export default NavItem;
