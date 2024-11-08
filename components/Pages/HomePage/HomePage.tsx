/* eslint-disable react/no-unescaped-entities */
import { CopyIcon, KeyboardIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { CgAttachment } from "react-icons/cg";
import { toast } from "sonner";
import { useFormManager } from "../../../base/hooks/useFormManager";
import { useAuth } from "../../../base/store/authStore/authStore";
import VideoIcon from "../../Icons/VideoIcon";
import Container from "../../ui/Container";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { useCreateMeeting } from "./hooks/useCreateMeeting";
import { joinMeetingValidator } from "./joinMeetingValidator";

const HomePage = () => {
  const router = useRouter();
  const { methods } = useFormManager(joinMeetingValidator);
  const { user } = useAuth();
  const { data, isLoading, handleCreateMeeting } = useCreateMeeting();
  console.log("🚀 ~~ HomePage ~~ data:", data);

  const [isOpen, setIsOpen] = useState(false);

  const copyLink = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Meeting Link Copied");
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className='mt-32'>
      {isOpen && data?.data && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent className='max-w-96 !rounded-3xl'>
            <DialogHeader>
              <DialogTitle className='text-2xl'>Here's your joining info</DialogTitle>
            </DialogHeader>

            <DialogDescription className='lg:text-lg'>
              Send this to people you want to meet with. Be sure to save it so you can use it later,
              too.
            </DialogDescription>

            <div className='px-3 mb-6 py-2 rounded flex items-center bg-muted-foreground/20 font-medium'>
              <p className='w-full line-clamp-1'>{`${window.location.origin}/${data.data.id}`}</p>
              <button onClick={() => copyLink(`${window.location.origin}/${data.data.id}`)}>
                <CopyIcon className='w-6 h-6' />
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Container>
        <div className='max-w-xl mx-auto text-center'>
          <h2 className='text-3xl xl:text-5xl leading-tight'>
            Premium video meetings. Now free for everyone.
          </h2>

          <p className='mt-3 text-muted-foreground text-lg xl:text-xl xl:leading-8'>
            We re-engineered the service we built for secure business meetings, Google Meet, to make
            it free and available for all.
          </p>
        </div>

        {/* the form */}
        <div className='grid gap-3 max-w-[600px] mx-auto mt-10 lg:space-x-6 lg:flex items-stretch'>
          <Popover>
            <PopoverTrigger asChild className=''>
              <Button
                isLoading={isLoading}
                className='flex space-x-3 py-3 text-base px-8 font-semibold'
              >
                <VideoIcon className='w-5 h-5' />
                <span>New Meeting</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className='shadow-xl border-[0.1px] border-border/20 py-3'>
              <button
                className='flex py-3 cursor-pointer w-full items-center space-x-4'
                onClick={() => {
                  if (user) {
                    handleCreateMeeting(data => {
                      router.push(`/${data.id}/join`);
                    });
                    return;
                  }
                  router.push("/auth/login");
                }}
              >
                <PlusIcon className='w-6 h-6' />
                <p className=''>Create a instant meeting</p>
              </button>

              <button
                className='flex py-3 cursor-pointer w-full items-center space-x-4'
                onClick={() => {
                  if (user) {
                    handleCreateMeeting(data => {
                      setIsOpen(true);
                    });
                    return;
                  }
                  router.push("/auth/login");
                }}
              >
                <CgAttachment className='w-6 h-6' />
                <p className=''>Create a meeting for Later</p>
              </button>
            </PopoverContent>
          </Popover>

          <FormProvider {...methods}>
            <form className='flex w-full items-stretch space-x-2'>
              <div className='border flex items-center w-full px-4 border-border rounded py-1'>
                <KeyboardIcon />
                <Input
                  type='text'
                  className='border-none placeholder-border outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                  placeholder='Enter code or link'
                />
              </div>

              <Button
                type='button'
                className='text-lg font-medium lg:text-xl hover:bg-primary/10 bg-primary/10 lg:bg-transparent text-primary'
                onClick={() => router.push("/meeting-page")}
              >
                Join
              </Button>
            </form>
          </FormProvider>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
