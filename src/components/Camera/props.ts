import { CameraMode, CameraView, VideoQuality } from "expo-camera";

export interface CameraProps {
  cameraRef: React.RefObject<CameraView>;
  videoQuality: VideoQuality;
  mode: CameraMode;
  mute: boolean;
  isRecording: boolean;
  onRecord: () => void;
  onStopRecording: () => void;
}
