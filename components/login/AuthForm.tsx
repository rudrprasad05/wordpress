"use client";

import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsFacebook, BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema, LoginFormType } from "@/schema/auth";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    if (session?.status == "authenticated") {
      router.push(`/dashboard/${session.data.user?.name}`);
    }
  }, [session?.status, router]);

  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: `/dashboard`,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials");
        } else if (callback?.ok) {
          toast.success("Signed In Successfully");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const socialAction = (action: string) => {
    signIn(action, { redirect: false, callbackUrl: "/dashboard" })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials");
        }

        toast.success("Login Successful");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="w-screen h-[90vh] relative grid items-center">
      <div className="px-8 py-5 rounded-lg bg-secondary lg:w-1/3 w-4/5 mx-auto my-auto">
        <div className="text-xl text-center">Login</div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="enter email"
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
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={isPasswordVisible ? "text" : "password"}
                        autoComplete="off"
                        placeholder="enter password"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (isPasswordVisible) setIsPasswordVisible(false);
                          else setIsPasswordVisible(true);
                        }}
                        className=" h-full aspect-square absolute top-0 right-0 grid place-items-center "
                      >
                        {isPasswordVisible ? (
                          <FiEyeOff className="stroke-muted-foreground w-5 h-5" />
                        ) : (
                          <FiEye className="stroke-muted-foreground w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              {isLoading && <FaSpinner className={"animate-spin mr-3"} />}
              Login
            </Button>
          </form>
        </Form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted-foreground" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 text-muted-foreground text-sm bg-secondary">
                Or Continue With
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-6">
          {/* <AuthSocialButton
            onClick={() => socialAction("facebook")}
            icon={BsFacebook}
          /> */}
          <AuthSocialButton
            name={"Google"}
            onClick={() => socialAction("google")}
            icon={BsGoogle}
          />
          <AuthSocialButton
            name={"GitHub"}
            onClick={() => socialAction("github")}
            icon={BsGithub}
          />
        </div>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2">
          <div>Dont have an Account?</div>
          <Link
            href={"/register"}
            className={"text-primary underline cursor-pointer"}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
