import LogoImg from "@/public/images/logo.png";
import Image from "next/image";
import { ICommonProps } from "../../base/interfaces/IProps";

const Logo = ({ className }: ICommonProps) => {
  return (
    <div className='flex space-x-1 items-center'>
      <picture>
        <Image className='w-32 h-auto' src={LogoImg} alt='' role='presentation' />
      </picture>

      <p className='text-muted-foreground font-medium text-2xl mb-1'>Meet</p>
    </div>
  );
};

export default Logo;
