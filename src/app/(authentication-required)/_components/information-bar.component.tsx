import { cn } from "@/shared/utils/cn.util";

type TopBarProps = {
  email: string;
  className?: string;
};

const TopBar: React.FC<TopBarProps> = ({ email, className }) => (
  <aside
    className={cn(
      "flex items-center justify-end bg-background py-4 text-muted-foreground",
      className
    )}
  >
    <small className="text-sm">
      Welcome, <span className="font-mono font-bold">{email}</span>
    </small>
  </aside>
);

export { TopBar };
