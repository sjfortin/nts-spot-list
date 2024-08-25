"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import SpotifyLogin from "./SpotifyLogin";
import SpotifyProfile from "./SpotifyProfile";

const SpotifyAuth = () => {
  const { user } = useUser();
  const [spotifyProfile, setSpotifyProfile] = useState(null);

  useEffect(() => {
    const fetchSpotifyProfile = async () => {
      if (user) {
        try {
          const response = await fetch("/api/spotify/profile");
          if (response.ok) {
            const data = await response.json();
            setSpotifyProfile(data.spotifyProfile);
          }
        } catch (error) {
          console.error("Error fetching Spotify profile:", error);
        }
      }
    };

    fetchSpotifyProfile();
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div>
      {spotifyProfile ? (
        <SpotifyProfile spotifyProfile={spotifyProfile} />
      ) : (
        <SpotifyLogin />
      )}
    </div>
  );
};

export default SpotifyAuth;
