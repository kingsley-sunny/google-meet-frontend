import { UserIcon } from "lucide-react";
import { BsInfoCircle } from "react-icons/bs";
import { ImPhoneHangUp } from "react-icons/im";
import { LuUsers2 } from "react-icons/lu";
import { MdOutlineMessage, MdOutlineScreenShare } from "react-icons/md";
import MicIcon from "../../Icons/MicIcon";
import VideoIcon from "../../Icons/VideoIcon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

const MeetingPage = () => {
  return (
    <div className='bg-black/90 relative h-screen text-white px-8 py-4'>
      <div className=' h-[calc(100%-4rem)] flex gap-4 justify-center items-center w-full'>
        {/* the user */}
        <div className='relative bg-white/10 rounded-xl w-full h-[calc(100%-24rem)] max-w-6xl mx-auto flex justify-center items-center'>
          <Avatar className='w-32 h-32'>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>
              <UserIcon className='w-28 h-2' />
            </AvatarFallback>
          </Avatar>

          <p className='text-lg absolute bottom-4 left-4'>John Doe</p>
        </div>

        {/* the user */}
        <div className='relative bg-white/10 rounded-xl w-full h-[calc(100%-24rem)] max-w-6xl mx-auto flex justify-center items-center'>
          <Avatar className='w-32 h-32'>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>
              <UserIcon className='w-28 h-2' />
            </AvatarFallback>
          </Avatar>

          <p className='text-lg absolute bottom-4 left-4'>John Doe</p>
        </div>

        <div className='relative bg-white/10 rounded-xl w-full h-[calc(100%-24rem)] max-w-6xl mx-auto flex justify-center items-center'>
          <Avatar className='w-32 h-32'>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>
              <UserIcon className='w-28 h-2' />
            </AvatarFallback>
          </Avatar>

          <p className='text-lg absolute bottom-4 left-4'>John Doe</p>
        </div>
      </div>

      {/* The bottom nav */}
      <div className=' flex justify-between '>
        <div className='hidden lg:flex space-x-4 items-center '>
          <p className=''>{new Date().toDateString()}</p>

          <div className='py-1 border-l pl-4 border-l-muted-foreground'>New Meeting</div>
        </div>

        {/* the icons */}
        <div className='flex space-x-4 items-center'>
          <button className='w-12 h-12 bg-white/15 rounded-full flex justify-center items-center'>
            <MicIcon className='w-5 h-5' />
          </button>

          <button className='w-12 h-12 bg-white/15 rounded-full flex justify-center items-center'>
            <VideoIcon className='w-5 h-5' />
          </button>

          <button className='w-12 h-12 bg-white/15 rounded-full flex justify-center items-center'>
            <MdOutlineScreenShare className='w-5 h-5' />
          </button>

          <button className='w-12 h-12 bg-white/15 rounded-full flex justify-center items-center'>
            <ImPhoneHangUp className='w-5 h-5' />
          </button>
        </div>

        {/* THE SETTINGS AND THE CHAT ICONS */}
        <div className='flex space-x-4 items-center'>
          <button className='w-12 h-12 rounded-full flex justify-center items-center'>
            <BsInfoCircle className='w-6 h-6' />
          </button>

          <button className='w-12 h-12 rounded-full flex justify-center items-center'>
            <LuUsers2 className='w-6 h-6' />
          </button>

          <button className='w-12 h-12 rounded-full flex justify-center items-center'>
            <MdOutlineMessage className='w-6 h-6' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingPage;
