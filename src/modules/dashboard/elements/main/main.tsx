import DashboardOverViewCard from '@/shared/components/cards/overviews.cards';
import SubscribersChart from '@/shared/components/charts/subscribe.charts';
import { ICONS } from '@/shared/utils/icons';
import { useUser } from '@clerk/nextjs';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
function Main() {
  const { user } = useUser();
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    const smallText = document.querySelector(".copy-text") as HTMLElement;
    if (smallText) {
      const textToCopy = smallText.innerText;
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopied(true);
        toast.success("Copied to clipboard");
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      });
      console.log(textToCopy,"textToCopy");
    }
    
  };

  return (
    <div className="p-5 w-full h-screen bg-[#f9fafb]">
      <h1 className="text-2xl text-surface-900 font-medium">
        Hi {user?.fullName} 👋
      </h1>
      <p className="opacity-70 text-sm">
        Here's how your publications are doing.
      </p>
      <div className="w-full flex">
        <div className="w-[65%] min-h-[88vh] pr-5">
          <DashboardOverViewCard />
          <br />
          <SubscribersChart />
        </div>
        <div className="w-[35%] p-5">
          {/* Create newsletter button */}
          <div className="w-full flex justify-end">
            <Button className="bg-black text-white text-lg rounded !px-6">
              <span className="mr-1 ml-[-5px]">{ICONS.write}</span>
              Start Writing
            </Button>
          </div>
          <br />
          <div>
            <h5 className="text-xl font-medium">Resources</h5>
            <div className="w-full bg-white border rounded p-5 my-3">
              {/* Home page URL */}
              <div>
                <h4 className="font-medium">Home page</h4>
                <div
                  className={`w-full px-2 my-1 h-[38px] bg-transparent border rounded-lg relative flex items-center cursor-pointer ${copied ? "bg-blue-200" : "bg-transparent"}`}
                  onClick={handleCopyClick}
                >
                  <small className="w-[70%] text-sm overflow-hidden overflow-ellipsis whitespace-nowrap copy-text">
                    {process.env.NEXT_PUBLIC_WEBSITE_URL || ''}/subscribe?username=
                    {user?.username}
                  </small>
                  <div className="absolute h-[38px] w-[90px] rounded-r-lg bg-[#DFE7FF] right-0 flex items-center justify-center">
                    <span className="text-lg">{ICONS.copy}</span>
                    <span className="pl-1">Copy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-white border rounded p-5 my-3">
            <h5 className="font-medium">Tutorials</h5>
            <p className="text-sm opacity-70">
              Learn how to get started on becodemy and utilize all our features,
              directly from the becodemy team.
            </p>
            <br />
            <Button className="bg-[#FBCFE8] text-[#831743] rounded-lg h-[35px] flex items-center">
              Tutorials <span>{ICONS.link}</span>
            </Button>
          </div>
          {/* Need help? */}
          <div className="w-full bg-white border rounded p-5 my-3">
            <h5 className="font-medium">Need help?</h5>
            <Link href={"/"}>
              <div className="w-max px-3 my-2 h-[33px] bg-transparent border rounded-lg flex items-center">
                <span className="text-sm">Knowledge base</span>
                <span className="ml-1">{ICONS.link}</span>
              </div>
            </Link>
            <Link href={"/"}>
              <div className="w-max px-3 my-2 h-[33px] bg-transparent border rounded-lg flex items-center">
                <span className="text-sm">API Documentation</span>
                <span className="ml-1">{ICONS.link}</span>
              </div>
            </Link>
            <Link href={"/"}>
              <div className="w-max px-3 my-2 h-[33px] bg-transparent border rounded-lg flex items-center">
                <span className="text-sm">Blog</span>
                <span className="ml-1">{ICONS.link}</span>
              </div>
            </Link>
            <Link href={"/"}>
              <div className="w-max px-3 my-2 h-[33px] bg-transparent border rounded-lg flex items-center">
                <span className="text-sm">FAQ</span>
                <span className="ml-1">{ICONS.link}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
