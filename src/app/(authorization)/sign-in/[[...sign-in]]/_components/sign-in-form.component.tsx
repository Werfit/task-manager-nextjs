"use client";

import {
  loginSchema,
  LoginSchema,
} from "@/shared/schemas/authentication.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { useToast } from "@/hooks/use-toast.hook";
import { logger } from "@/services/logger/logger.service";

type SignInFormProps = {
  redirectUrl?: string;
};

const SignInForm: React.FC<SignInFormProps> = ({ redirectUrl }) => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { signIn, setActive } = useSignIn();
  const { toast } = useToast();

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-y-3"
        onSubmit={form.handleSubmit(async (data) => {
          try {
            const response = await signIn?.create({
              identifier: data.email,
              password: data.password,
            });

            if (response?.status === "complete") {
              setActive?.({ session: response.createdSessionId, redirectUrl });
            }
          } catch (error) {
            logger.error(error);

            if (isClerkAPIResponseError(error)) {
              toast({
                variant: "destructive",
                title: "Authentication Failed",
                description: error.errors[0].longMessage,
              });
              return;
            }

            toast({
              variant: "destructive",
              title: "Authentication Failed",
              description: "Failed to sign in user",
            });
          }
        })}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="E.g. ai.enthusiast@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button>Proceed</Button>
      </form>
    </Form>
  );
};

export { SignInForm };
