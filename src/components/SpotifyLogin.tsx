"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const SpotifyLogin = () => {
  const handleLogin = () => {
    window.location.href = `/api/spotify/login`;
  };

  return <Button onClick={handleLogin}>Login to Spotify</Button>;
};

export default SpotifyLogin;
