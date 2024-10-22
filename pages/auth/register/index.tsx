import HomeLayout from "../../../components/Layouts/HomeLayout";
import RegisterPage from "../../../components/Pages/AuthPages/RegisterPage/RegisterPage";
import { cn } from "../../../lib/utils";

const index = () => {
  return (
    <HomeLayout className={cn("text-foreground")}>
      <RegisterPage />
    </HomeLayout>
  );
};

export default index;
