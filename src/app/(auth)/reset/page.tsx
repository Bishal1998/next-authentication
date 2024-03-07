"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import Link from "next/link";
import Social from "@/components/Social";
import Header from "@/components/Header";
import AuthLayout from "../authLayout";
import { IoIosArrowBack } from "react-icons/io";

interface IForgotPassword {
  email: string;
}

const forgotSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const ForgotPassword = () => {
  const [isPending, startTransition] = useTransition();

  const forgotPassword = useForm<IForgotPassword>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (data: IForgotPassword) => {
    startTransition(() => {
      console.log(data);
    });
  };
  return (
    <AuthLayout>
      <section className="w-full lg:w-1/2">
        <Link href={"/login"} className="flex items-center">
          <IoIosArrowBack size={24} />
          <p className="font-semibold">Back to Login</p>
        </Link>
        <Header
          title="Forgot your password?"
          subtitle="Don't worry, happens to all of us. Enter your email below to recover your password"
        />
        <Form {...forgotPassword}>
          <form
            onSubmit={forgotPassword.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={forgotPassword.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
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
            <Button
              type="submit"
              className="bg-[#515def] text-white w-full py-6"
              disabled={isPending}
            >
              Submit
            </Button>
          </form>
        </Form>
        <div className="flex items-center w-full pt-12 pb-6">
          <hr className="w-1/2" />
          <p className="text-base text-gray-400 whitespace-nowrap px-4">
            Or Login With
          </p>
          <hr className="w-1/2" />
        </div>
        <Social />
      </section>
    </AuthLayout>
  );
};

export default ForgotPassword;
