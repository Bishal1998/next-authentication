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
import { useState, useTransition } from "react";
import Header from "@/components/Header";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import Social from "@/components/Social";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

interface IRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(3, { message: "First Name must have at least 3 characters" }),
    lastName: z
      .string()
      .min(3, { message: "First Name must have at least 3 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(10, { message: "Invalid phone number" }),
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

const Register = () => {
  const [isPending, startTransition] = useTransition();
  const [passActive, setPassActive] = useState(false);
  const [confirmActive, setConfirmActive] = useState(false);

  const registerForm = useForm<IRegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agree: false,
    },
  });
  const onSubmit = (data: IRegisterForm) => {
    startTransition(() => {
      if (!data.agree) {
        return;
      }

      console.log(data);
    });
  };

  return (
    <section className="w-full lg:w-1/2">
      <Header
        title="Register"
        subtitle="Let's get you all st up so you can access your personal account."
      />
      <Form {...registerForm}>
        <form
          onSubmit={registerForm.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="w-full flex items-center justify-between gap-4">
            <FormField
              control={registerForm.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="First Name"
                      type="text"
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
              control={registerForm.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Last Name"
                      type="text"
                      {...field}
                      disabled={isPending}
                      className="py-6"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex items-center justify-between gap-4">
            <FormField
              control={registerForm.control}
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
            <FormField
              control={registerForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Phone Number"
                      type="tel"
                      {...field}
                      disabled={isPending}
                      className="py-6"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={registerForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Password"
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
            control={registerForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Confirm Password"
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
          <div className="flex gap-2 items-center justify-between space-y-2">
            <div className="flex items-center gap-2">
              <FormField
                control={registerForm.control}
                name="agree"
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
              <p className="text-gray-600">
                I agree all the <span className="text-red-400"> Terms</span> and
                <span className="text-red-400"> Privacy Policies.</span>
              </p>
            </div>
            <p className="text-red-600 cursor-pointer">Forgot Password?</p>
          </div>
          <Button
            type="submit"
            className="bg-[#515def] text-white w-full py-6"
            disabled={isPending}
          >
            Create account
          </Button>
        </form>
      </Form>
      <p className="text-center py-4">
        Already have an account?{" "}
        <Link href={"/login"} className="text-red-400">
          Login
        </Link>
      </p>
      <div className="flex items-center w-full py-4">
        <hr className="w-1/2" />
        <p className="text-base text-gray-400 whitespace-nowrap px-4">
          Or Register With
        </p>
        <hr className="w-1/2" />
      </div>
      <Social />
    </section>
  );
};

export default Register;
