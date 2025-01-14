
import AnimatedHeading from "@/components/general/animatedHeading"
import NotificationsComp from "@/components/home/Notifications";
import DashCounts from "@/components/home/Counts";
import RecentEmployees from "@/components/home/RecentEmployees";
import Experience from "@/components/home/Experience";
import YearlyReports from "@/components/home/YearlyReports";
import OnBoarding from "@/components/home/onBoarding";
import TextNotification from "@/components/home/TextNotification";
import { Alert } from "@/components/ui/alert";




const Home = () => {
  return (
    <div className="py-6 space-y-4">
      <div>
        <AnimatedHeading className='font-misologist font-normal' title='Dashboard' varient='heading' />
      </div>

      <div className="flex justify-between gap-6">

        <div className="w-full space-y-4">
            <DashCounts/>
            <RecentEmployees/>
            <Alert variant={'default'} className='mt-4'>
                <p className="opacity-70">This is a Beta Release, Bugs & Errors are expected!</p>
            </Alert>
            {/* <CampaignsResult/> */}
        </div>

        <div className="w-full space-y-4">
            <Experience/>
            <OnBoarding/>
            <TextNotification/>
            <div className="w-full">
              {/* <Image draggable={false} className="w-full h-auto rounded-xl object-contain" src={"/cover2.png"} alt="Mazen Banner" width={400} height={100}/> */}
            </div>

            <YearlyReports/>
        </div>

        <NotificationsComp/>

      </div>
    </div>
  )
}

export default Home