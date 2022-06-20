import ReactPlayer, { YouTubePlayerProps } from 'react-player/youtube';

interface YoutubePlayerProps extends YouTubePlayerProps {
  videoUrl: string;
  h?: string;
  w?: string;
  playing?: boolean;
  skipThumbnail?: boolean;
  onEnded?: () => void;
  onStart?: () => void;
}

export const YoutubePlayer: React.FC<YoutubePlayerProps> = ({
  videoUrl,
  h,
  w,
  playing,
  onEnded,
  onStart,
  skipThumbnail,
  ...props
}) => {
  return (
    <ReactPlayer
      url={videoUrl}
      light={!skipThumbnail}
      height={h}
      width={w}
      playing={playing}
      controls
      onEnded={onEnded}
      onStart={onStart}
      {...props}
    />
  );
};
