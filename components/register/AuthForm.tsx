"use client";

import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
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
import { FiEye, FiEyeOff } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RegisterFormSchema, RegisterFormType } from "@/schema/auth";
import AuthSocialButton from "../login/AuthSocialButton";
import { FaSpinner } from "react-icons/fa";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  useEffect(() => {
    if (session?.status == "authenticated") {
      router.push("/dashboard");
    }
  }, [session?.status, router]);

  const form = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });

  function onSubmit(data: RegisterFormType) {
    data.confirmPassword = data.password;
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => signIn("credentials", data))
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => setIsLoading(false));
  }

  const socialAction = (action: string) => {
    setIsLoading(true);

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
        <div className="text-xl text-center">Create New Account</div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="enter name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

            {/* <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
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
                  <div>{confirmPasswordError}</div>
                </FormItem>
              )}
            /> */}

            <Button className="w-full" type="submit">
              {isLoading && <FaSpinner className={"animate-spin mr-3"} />}
              Register
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
          <div>Already have an Account?</div>
          <div
            onClick={() => router.push("/login")}
            className={"text-primary underline cursor-pointer"}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
