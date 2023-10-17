"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email." }),
  prompt: z.string().nonempty({ message: "Required" }),
  message: z.string().nonempty({ message: "Required" }),
});

export default function MainForm() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      prompt: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch("/api/property", {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (response.status === 200) {
      toast({
        title: "Successfully Created",
        description: "We will send you an email once your report runs!",
      });
    } else {
      toast({
        title: "An Error Occurred",
        description: "Please try again later or reach out to support.",
      });
    }
    const data = await response.json();
    // router.push("/property");
    setTimeout(() => window.location.assign("/property"), 2000);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email of Postcard Recipient</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" {...field} />
                </FormControl>
                <FormDescription>
                  Who do you want to send an email to?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postcard Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="Dear Friend..." {...field} />
                </FormControl>
                <FormDescription>
                  Message for your friend or family.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image Prompt</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="A beautiful ocean view..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Prompt for the postcard image.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="outline" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
