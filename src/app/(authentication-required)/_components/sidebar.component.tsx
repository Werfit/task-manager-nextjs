import { Button } from "@/components/ui/button";
import { cn } from "@/shared/utils/cn.util";
import { BarChartIcon, HouseIcon } from "lucide-react";

import Link from "next/link";
import { LogoutButton } from "./logout-button.component";

type SidebarProps = {
  email: string;
  className?: string;
};

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <nav
      className={cn(
        "flex justify-center gap-y-2 bg-white px-6 py-10 md:flex-col md:justify-start md:py-20",
        className
      )}
    >
      <Button className="justify-start" variant="ghost" asChild>
        <Link href="/dashboard">
          <HouseIcon /> Home
        </Link>
      </Button>
      <Button className="justify-start" variant="ghost" asChild>
        <Link href="/statistics">
          <BarChartIcon />
          Statistics
        </Link>
      </Button>
      <LogoutButton />
    </nav>
  );
};

export { Sidebar };
