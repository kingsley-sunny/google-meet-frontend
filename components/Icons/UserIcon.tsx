import { ICommonProps } from "../../base/interfaces/IProps";
import { cn } from "../../lib/utils";

const UserIcon = ({ className }: ICommonProps) => {
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
        clipRule='evenodd'
        d='M10.5 3.498a2.999 2.999 0 01-3 2.998 2.999 2.999 0 113-2.998zm2 10.992h-10v-1.996a3 3 0 013-3h4a3 3 0 013 3v1.997z'
        stroke='currentColor'
        strokeLinecap='square'
      ></path>
    </svg>
  );
};

export default UserIcon;
