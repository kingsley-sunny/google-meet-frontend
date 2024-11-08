import { AnyFunctionType } from "../../../base/types/types";
import UserIcon from "../../Icons/UserIcon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { useMeetingRequestsWebSocket } from "./hooks/useMeetingWebSocket";

export const ApprovalModal = ({
  requests,
  isOpen,
  setIsOpen,
}: {
  requests: any[];
  isOpen: boolean;
  setIsOpen: AnyFunctionType;
}) => {
  const { handleRequest } = useMeetingRequestsWebSocket();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent onInteractOutside={() => {}}>
        <DialogHeader>
          <DialogTitle>Someone wants to join your meeting?</DialogTitle>
          <div className='mt-4'>
            {requests.map(request => (
              <div
                key={request?.socketId}
                className='flex justify-between space-x-4 items-center mt-5 py-3'
              >
                <Avatar>
                  <AvatarImage src={request?.pic_url} />
                  <AvatarFallback className='text-xl'>
                    <UserIcon className='w-4 h-4' />
                  </AvatarFallback>
                </Avatar>

                <div className='lg:flex lg:justify-between w-full lg:space-x-3 items-center'>
                  <p className='text-left text-lg'>{request?.name}</p>

                  <div className='flex text-base space-x-4 mt-1'>
                    <button
                      className='text-primary'
                      onClick={() => {
                        handleRequest(request.socketId, "accept");
                        setIsOpen(false);
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className='text-destructive'
                      onClick={() => {
                        handleRequest(request.socketId, "reject");
                        setIsOpen(false);
                      }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
