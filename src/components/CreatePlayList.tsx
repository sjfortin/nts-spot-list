"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

const formSchema = z.object({
  playlistName: z.string().min(2, {
    message: "Playlist name must be at least 2 characters.",
  }),
});

export function CreatePlaylist() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      playlistName: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const response = await fetch("/api/create-playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: accessToken,
          user_id: userId,
          playlist_name: values.playlistName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create playlist");
      }

      const data = await response.json();
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="playlistName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Playlist Name</FormLabel>
              <FormControl>
                <Input placeholder="Playlist Name" {...field} />
              </FormControl>
              <FormDescription>
                Enter the name for your new playlist.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Playlist</Button>
      </form>
    </Form>
  );
}
