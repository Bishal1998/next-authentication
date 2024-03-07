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
import Header from "@/components/Header";
import AuthLayout from "../authLayout";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

interface ICreatePass {
  password: string;
  confirmPassword: string;
}

const createPassSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      ),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    agree: z.boolean().default(false).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords does not match",
  });

const CreatePass = () => {
  const [isPending, startTransition] = useTransition();
  const [passActive, setPassActive] = useState(false);
  const [confirmActive, setConfirmActive] = useState(false);

  const passwordForm = useForm<ICreatePass>({
    resolver: zodResolver(createPassSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = (data: ICreatePass) => {
    startTransition(() => {
      console.log(data);
      passwordForm.reset();
    });
  };
  return (
    <AuthLayout>
      <section className="w-full lg:w-1/2">
        <Header
          title="Set a password"
          subtitle="Your previous password has been reseted. Please set a new password for your account."
        />
        <Form {...passwordForm}>
          <form
            onSubmit={passwordForm.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={passwordForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Create Password"
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
            <FormField
              control={passwordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Re-enter Password"
                        type={confirmActive ? "text" : "password"}
                        {...field}
                        disabled={isPending}
                        className="py-6"
                      />
                      <div className="absolute right-4 bottom-4">
                        {confirmActive ? (
                          <FaRegEye
                            size={20}
                            className="cursor-pointer"
                            onClick={() => setConfirmActive(!confirmActive)}
                          />
                        ) : (
                          <FaRegEyeSlash
                            size={20}
                            className="cursor-pointer"
                            onClick={() => setConfirmActive(!confirmActive)}
                          />
                        )}
                      </div>
                    </div>
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
              Set Password
            </Button>
          </form>
        </Form>
      </section>
    </AuthLayout>
  );
};

export default CreatePass;
