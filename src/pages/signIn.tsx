import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import $axios from "@/http";
import {loginSchema} from "@/lib/validation";
import { AuthStore } from "@/store/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Fade } from "react-awesome-reveal";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignIn = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  
  useEffect(() => {
    if(accessToken) navigate("/");
  }, [accessToken]);


  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const {setUser,setAuth} = AuthStore();

  const {mutate} = useMutation({
    mutationKey: ["login"],
    mutationFn:async (values: z.infer<typeof loginSchema>) =>  {
      const {data} = await $axios.post("users/login/", JSON.stringify(values), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
  },
  onSuccess:async (data) => {
    toast.success("Login Success");
    const {access} = data;
    localStorage.setItem("accessToken", access);
    const userMe = await $axios.get("users/me/", {
      headers: {
        "Authorization": `Bearer ${access}`
      }
    });
    setUser(userMe.data);
    localStorage.setItem("user", JSON.stringify(userMe.data));
    setAuth(true);
  },
  onError: () => {
    toast.error("Username or Password is incorrect");
  },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    mutate(values);
  }

  return (
    <section className="w-full md:px-24 py-12">
      <div className="container  flex md:flex-row flex-col items-center">
      <Fade direction="left" triggerOnce className="md:w-1/2 w-full flex flex-col md:px-24 py-12 mt-12 px-16 drop-shadow-md border">
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <h1 className="text-4xl font-bold text-center">Sign In</h1>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
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
                    <Input type="password" placeholder="*****" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
            <p className="poppins-black text-[12px] md:text-lg">Don't have an account <Link to={'/signup'} className="text-blue-500 hover:underline">Sign Up</Link></p>
          </form>
        </Form>
      </Fade>
      <Fade direction="right" triggerOnce className="md:w-1/2">
        <img src="service/signin.jpg" alt="" />
      </Fade>
      </div>
    </section>
  );
};

export default SignIn;
