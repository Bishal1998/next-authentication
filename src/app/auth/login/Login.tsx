"use client";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import Header from "@/components/Header";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

interface ILoginForm {
  email: string;
  password: string;
  remember: boolean;
}

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  remember: z.boolean().default(false).optional(),
});
/* { message: "Password must be at least 8 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      } */
const Login = () => {
  const [isPending, startTransition] = useTransition();

  const loginForm = useForm<ILoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });
  const onSubmit = (data: ILoginForm) => {
    startTransition(() => {
      console.log(data);
    });
  };

  return (
    <section className="w-1/3">
      <Header
        title="Login"
        subtitle="Login to access your travelwise account"
      />
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter your mail"
                    type="email"
                    {...field}
                    disabled={isPending}
                    className="py-6"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="***********"
                    type="password"
                    {...field}
                    disabled={isPending}
                    className="py-6"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <div className="flex gap-2 items-center justify-between space-y-2">
            <div className="flex items-center gap-2">
              <FormField
                control={loginForm.control}
                name="remember"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isPending}
                        className="bg-[#515def] text-white text-xs"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <p className="text-gray-600">Remember Me</p>
            </div>
            <p className="text-red-600 cursor-pointer">Forgot Password?</p>
          </div>
          <Button
            type="submit"
            className="bg-[#515def] text-white w-full py-6"
            disabled={isPending}
          >
            Submit
          </Button>
        </form>
      </Form>
      <p className="text-center py-4">
        Don't have an account?{" "}
        <Link href={"/register"} className="text-red-400">
          Sign up
        </Link>
      </p>
      <div className="flex items-center w-full">
        <hr className="w-1/2" />
        <p className="text-base text-gray-400 whitespace-nowrap px-4">
          Or Login with
        </p>
        <hr className="w-1/2" />
      </div>
    </section>
  );
};

export default Login;
