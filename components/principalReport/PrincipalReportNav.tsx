"use client";
import { Building, User2, Projector, Weight, Brain, SquareActivity, AlbumIcon, NotebookText, BedSingle, ArrowRight, ArrowLeft } from 'lucide-react'; // Import your icons
import { FC } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { Progress } from "@/components/ui/progress";
import { Button } from '../ui/button';
import NavItem from './navItem';

// Define the structure of each navigation item
interface NavItemData {
  href: string;
  icon: FC<React.SVGProps<SVGSVGElement>>; // SVG icon type
  label: string;
}

const PrincipalReportNav: FC = () => {
  const router = useRouter();
  const path = usePathname();

  const items: NavItemData[] = [
    { href: '/principal-report/add', icon: Building, label: 'Students' },
    { href: '/principal-report/add/employees', icon: User2, label: 'Employees' },
    { href: '/principal-report/add/workload', icon: Weight, label: 'Workload' },
    { href: '/principal-report/add/rechecking', icon: NotebookText, label: 'Recheking' },
    { href: '/principal-report/add/ttbl', icon: Projector, label: 'TTBL' },
    { href: '/principal-report/add/hcd', icon: Brain, label: 'HCD' },
    { href: '/principal-report/add/teneffus', icon: BedSingle, label: 'Tennufus' },
    { href: '/principal-report/add/activity', icon: SquareActivity, label: 'Activity' },
    { href: '/principal-report/add/conclusion', icon: AlbumIcon, label: 'S.W.O.T' },
  ];

  const currentIndex = items.findIndex((item) => item.href === path);

  const handleNavigate = (index: number) => {
    if (index >= 0 && index < items.length) {
      router.push(items[index].href);
    }
  };

  return (
    <div className='text-right'>
    <Button
      onClick={()=> {
        sessionStorage.clear()
        router.push('/principal-report/add')
        router.refresh()
      }}
    >CLEAR FORM</Button>
    <div className="flex items-center justify-between py-4">
      {/* Back Button */}
      <Button
        variant="outline"
        onClick={() => handleNavigate(currentIndex - 1)}
        disabled={currentIndex <= 0} // Disable if no previous item
        className="group" // Add the `group` class here
      >
        <ArrowLeft className="mr-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        Back: {currentIndex == 0 ? "" : items[currentIndex-1].label}
      </Button>

      {/* Navigation Items with Progress Bar */}
      <div className="flex justify-between items-center py-4 relative w-2/3 mx-auto bg-secondary/10 px-6 rounded-full overflow-clip">
        {items.map((item, index) => (
          <div key={index} className="relative flex flex-col items-center">
            {/* Navigation Item */}
            <NavItem
              active={currentIndex >= index}
              href={item.href}
              icon={item.icon}
              label={item.label}
              delay={index * 1}
            />
          </div>
        ))}

        {/* Progress Bar */}
        <div className="absolute top-1/3 mx-4 h-1 w-full -left-5 overflow-hidden px-12">
          <Progress
            className="h-1"
            value={(currentIndex + 1) * (100 / items.length)} // Updated for percentage
          />
        </div>
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        onClick={() => handleNavigate(currentIndex + 1)}
        disabled={currentIndex >= items.length - 1} // Disable if no next item
        className="group" // Add the `group` class here
      >
        Next: { currentIndex == items.length-1 ? "" : items[currentIndex+1].label}
        <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </Button>

    </div>
    </div>
  );
};

export default PrincipalReportNav;
