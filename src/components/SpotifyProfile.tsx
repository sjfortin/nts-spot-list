import Image from "next/image";
import SpotifyPlaylistSearch from "./SpotifyPlaylistSearch";

interface SpotifyProfileProps {
  spotifyProfile: {
    display_name: string;
    images: { url: string; height: number; width: number }[];
  };
}

const SpotifyProfile: React.FC<SpotifyProfileProps> = ({ spotifyProfile }) => {
  const profileImage = spotifyProfile.images[0]?.url;

  return (
    <>
      <div className="flex items-center space-x-4">
        {profileImage && (
          <Image
            src={profileImage}
            alt={spotifyProfile.display_name}
            width={64}
            height={64}
            className="rounded-full"
          />
        )}
        <span className="text-lg font-semibold">
          {spotifyProfile.display_name}
        </span>
      </div>
      <SpotifyPlaylistSearch />
    </>
  );
};

export default SpotifyProfile;
