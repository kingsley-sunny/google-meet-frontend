import { ICommonProps } from "../../base/interfaces/IProps";

const Logo = ({ className }: ICommonProps) => {
  return (
    <div className='flex space-x-1 items-center'>
      <picture>
        <img
          className='w-32 h-auto'
          src='https://www.gstatic.com/meet/google_meet_horizontal_wordmark_2020q4_1x_icon_124_40_2373e79660dabbf194273d27aa7ee1f5.png'
          srcSet='https://www.gstatic.com/meet/google_meet_horizontal_wordmark_2020q4_1x_icon_124_40_2373e79660dabbf194273d27aa7ee1f5.png 1x, https://www.gstatic.com/meet/google_meet_horizontal_wordmark_2020q4_2x_icon_124_40_292e71bcb52a56e2a9005164118f183b.png 2x '
          alt=''
          role='presentation'
        />
      </picture>

      <p className='text-muted-foreground font-bold text-2xl mb-1'>Meet</p>
    </div>
  );
};

export default Logo;
