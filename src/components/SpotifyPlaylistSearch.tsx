"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Playlist {
  id: string;
  name: string;
}

const SpotifyPlaylistSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  useEffect(() => {
    const filtered = playlists.filter((playlist) =>
      playlist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlaylists(filtered);
  }, [searchTerm, playlists]);

  const fetchPlaylists = async () => {
    try {
      const response = await fetch("/api/spotify/playlists");
      if (response.ok) {
        const data = await response.json();
        setPlaylists(data.playlists);
      }
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  return (
    <div className="mt-4">
      <Input
        type="text"
        placeholder="Search playlists..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <ul className="space-y-2">
        {filteredPlaylists.map((playlist) => (
          <li key={playlist.id} className="flex items-center justify-between">
            <span>{playlist.name}</span>
            <Button variant="outline" size="sm">
              Select
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpotifyPlaylistSearch;
