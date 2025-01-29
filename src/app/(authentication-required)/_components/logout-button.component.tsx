"use client";

import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import { UserIcon } from "lucide-react";

const LogoutButton = () => {
  const { signOut } = useClerk();

  return (
    <Button
      className="justify-start"
      variant="destructive"
      onClick={() => signOut({ redirectUrl: "/sign-in" })}
    >
      <UserIcon />
      Logout
    </Button>
  );
};

export { LogoutButton };
