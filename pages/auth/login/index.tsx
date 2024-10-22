import HomeLayout from "../../../components/Layouts/HomeLayout";
import LoginPage from "../../../components/Pages/AuthPages/LoginPage/LoginPage";
import { cn } from "../../../lib/utils";

const index = () => {
  return (
    <HomeLayout className={cn("text-foreground")}>
      <LoginPage />
    </HomeLayout>
  );
};

export default index;
