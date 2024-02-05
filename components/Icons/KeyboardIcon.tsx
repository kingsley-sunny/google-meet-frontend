import { ICommonProps } from "../../base/interfaces/IProps";
import { cn } from "../../lib/utils";

const KeyboardIcon = ({ className }: ICommonProps) => {
  return (
    <svg
      className={cn("w-7 h-7", className)}
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      width='15'
      height='15'
    >
      <path
        d='M11 11.5H4m7-3h-1m-2 0H7m-2 0H4m7-2h-1m-2 0H7m-2 0H4m3.5-2V0m6 4.5h-12a1 1 0 00-1 1v7a1 1 0 001 1h12a1 1 0 001-1v-7a1 1 0 00-1-1z'
        stroke='currentColor'
      ></path>
    </svg>
  );
};

export default KeyboardIcon;
