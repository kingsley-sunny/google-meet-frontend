import { ICommonProps } from "../../base/interfaces/IProps";
import { cn } from "../../lib/utils";

const Container = ({ className, children }: ICommonProps) => {
  return (
    <div className={cn("max-w-3xl lg:max-w-7xl mx-auto px-4 sm:px-8 md:px-10", className)}>
      {children}
    </div>
  );
};

export default Container;
