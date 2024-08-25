"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import SpotifyLogin from "./SpotifyLogin";
import SpotifyProfile from "./SpotifyProfile";

const SpotifyAuth = () => {
  const { user } = useUser();
  const [spotifyProfile, setSpotifyProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchSpotifyProfile();
  }, [user]);

  if (!user || loading) {
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
