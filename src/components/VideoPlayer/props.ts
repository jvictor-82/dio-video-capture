export interface VideoPlayerProps {
  video: {
    uri: string;
  };
  onSave: () => void;
  onShare: () => void;
  onDiscard: () => void;
}
