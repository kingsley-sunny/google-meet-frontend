import HomeLayout from "../components/Layouts/HomeLayout";
import HomePage from "../components/Pages/HomePage";
import { cn } from "../lib/utils";

export default function Home() {
  return (
    <HomeLayout className={cn("text-foreground")}>
      <HomePage />
    </HomeLayout>
  );
}
