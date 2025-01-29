import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { SignUpForm } from "./_components/sign-up-form.component";
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
        <CardTitle>Sign Up</CardTitle>

        <CardDescription>
          Fill in the fields below to access the manager dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <SignUpForm redirectUrl={params.redirect_url} />
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-muted-foreground text-sm">
          If you have an account already, you can{" "}
          <Link
            href="/sign-in"
            className="text-link"
          >
            Log In
          </Link>{" "}
          here
        </p>
      </CardFooter>
    </Card>
  );
};

export default Page;
