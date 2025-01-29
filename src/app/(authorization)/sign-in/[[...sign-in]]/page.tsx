import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { SignInForm } from "./_components/sign-in-form.component";
import { Link } from "@/components/link/link.component";
import { ServerPageProps } from "@/shared/types/page.type";

type PageProps = ServerPageProps<
  never,
  {
    redirect_url?: string;
  }
>;

const Page: React.FC<PageProps> = async ({ searchParams }) => {
  const params = await searchParams;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>

        <CardDescription>
          Fill in the fields below to access the manager dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm redirectUrl={params.redirect_url} />
      </CardContent>
      <CardFooter>
        <p className="text-center text-sm text-muted-foreground">
          If you have no account yet, you can{" "}
          <Link href="/sign-up" className="text-link">
            Sign Up
          </Link>{" "}
          here
        </p>
      </CardFooter>
    </Card>
  );
};

export default Page;
