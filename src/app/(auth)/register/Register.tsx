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
  email: string;
  password: string;
  remember: boolean;
}

const registerSchema = z.object({
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
const Register = () => {
  const [isPending, startTransition] = useTransition();
  const [passActive, setPassActive] = useState(false);

  const registerForm = useForm<IRegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });
  const onSubmit = (data: IRegisterForm) => {
    startTransition(() => {
      console.log(data);
    });
  };

  return (
    <section className="w-full lg:w-1/2">
      <Header
        title="Login"
        subtitle="Login to access your travelwise account"
      />
      <Form {...registerForm}>
        <form
          onSubmit={registerForm.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FormField
            control={registerForm.control}
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
            control={registerForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="***********"
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
          <div className="flex gap-2 items-center justify-between space-y-2">
            <div className="flex items-center gap-2">
              <FormField
                control={registerForm.control}
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
      <div className="flex items-center w-full py-4">
        <hr className="w-1/2" />
        <p className="text-base text-gray-400 whitespace-nowrap px-4">
          Or Login with
        </p>
        <hr className="w-1/2" />
      </div>
      <Social />
    </section>
  );
};

export default Register;
