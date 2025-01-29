import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Sidebar } from "./_components/sidebar.component";
import { TopBar } from "./_components/information-bar.component";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = async ({ children }) => {
  const user = await currentUser();

  if (!user) {
    throw redirect("/sign-in");
  }

  return (
    <div className="relative flex flex-col gap-x-4 md:flex-row">
      <Sidebar
        email={user.primaryEmailAddress?.emailAddress ?? ""}
        className="sticky top-0 z-10 w-full md:h-screen md:w-auto md:max-w-sm"
      />

      <div className="relative grid h-screen w-full grid-rows-[auto_1fr] px-10 py-16">
        <TopBar email={user.primaryEmailAddress?.emailAddress ?? ""} />

        <main className="overflow-x-auto overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
