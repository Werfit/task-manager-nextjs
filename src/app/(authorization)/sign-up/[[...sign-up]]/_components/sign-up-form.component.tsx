"use client";

import {
  signUpSchema,
  SignUpSchema,
} from "@/shared/schemas/authentication.schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSignUp } from "@clerk/nextjs";
import { logger } from "@/services/logger/logger.service";
import { useToast } from "@/hooks/use-toast.hook";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";

type SignUpFormProps = {
  redirectUrl?: string;
};

const SignUpForm: React.FC<SignUpFormProps> = ({ redirectUrl }) => {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const { signUp, setActive } = useSignUp();
  const { toast } = useToast();

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-y-3"
        onSubmit={form.handleSubmit(async (data) => {
          try {
            const response = await signUp?.create({
              emailAddress: data.email,
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
              title: "Authentication failed",
              description: "Failed to create the user. Contact the developer",
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
              <FormDescription className="flex flex-col">
                <span>
                  Passwords will contain at least 1 upper case letter.
                </span>
                <span>
                  Passwords will contain at least 1 lower case letter.
                </span>
                <span>
                  Passwords will contain at least 1 number or special character.
                </span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Confirm password</FormLabel>
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

export { SignUpForm };
