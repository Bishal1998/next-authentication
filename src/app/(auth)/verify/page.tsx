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
import { useState, useTransition } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import AuthLayout from "../authLayout";
import { IoIosArrowBack } from "react-icons/io";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

interface IVerify {
  code: string;
}

const verifySchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const VerifyCode = () => {
  const [isPending, startTransition] = useTransition();
  const [passActive, setPassActive] = useState(false);

  const forgotPassword = useForm<IVerify>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });
  const onSubmit = (data: IVerify) => {
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
          title="Verify code"
          subtitle="An authentication code has been sent to your email."
        />
        <Form {...forgotPassword}>
          <form
            onSubmit={forgotPassword.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={forgotPassword.control}
              name="code"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Enter Code"
                        type={passActive ? "text" : "password"}
                        {...field}
                        disabled={isPending}
                        className="py-6"
                      />
                      <div className="absolute right-4 bottom-4">
                        {passActive ? (
                          <FaRegEye
                            size={20}
                            className="cursor-pointer"
                            onClick={() => setPassActive(!passActive)}
                          />
                        ) : (
                          <FaRegEyeSlash
                            size={20}
                            className="cursor-pointer"
                            onClick={() => setPassActive(!passActive)}
                          />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <p>
              Don&apos;t send a code?{" "}
              <span className="text-red-400 cursor-pointer">Resend</span>
            </p>
            <Button
              type="submit"
              className="bg-[#515def] text-white w-full py-6"
              disabled={isPending}
            >
              Verify
            </Button>
          </form>
        </Form>
      </section>
    </AuthLayout>
  );
};

export default VerifyCode;
