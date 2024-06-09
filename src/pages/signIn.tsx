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
import { zodResolver } from "@hookform/resolvers/zod";
import { Fade } from "react-awesome-reveal";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const SignIn = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });


  function onSubmit(values: z.infer<typeof loginSchema>) {
    const promise = $axios.post("users/login/", JSON.stringify(values), {
      headers: {
        "Content-Type": "application/json",
      },
    }); 

    toast.promise(promise, {
      loading: "Signing in...",
      success: "Signed in",
      error: "Sign in failed",
    });
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
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
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
