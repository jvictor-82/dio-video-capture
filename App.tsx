import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { CameraRecordingOptions, CameraView } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";

import Camera from "./src/components/Camera";
import VideoPlayer from "./src/components/VideoPlayer";

export default function App() {
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions();
  const cameraRef = useRef<CameraView>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState<{ uri: string } | undefined>();

  const recordVideo = async () => {
    if (mediaLibraryPermission && mediaLibraryPermission.status !== "granted") {
      await requestMediaLibraryPermission();
    }
    setIsRecording(true);
    const options: CameraRecordingOptions = {
      maxDuration: 30000,
    };

    if (cameraRef && cameraRef.current) {
      cameraRef.current.recordAsync(options).then((recordedVideo) => {
        setVideo(recordedVideo);
      });
    }
  };

  const stopRecording = () => {
    if (cameraRef && cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };

  if (video) {
    const saveVideo = () => {
      MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
        discardVideo();
      });
    };

    const shareVideo = () => {
      shareAsync(video.uri).then(() => {
        discardVideo();
      });
    };

    const discardVideo = () => setVideo(undefined);

    return (
      <VideoPlayer
        video={video}
        onSave={saveVideo}
        onShare={shareVideo}
        onDiscard={discardVideo}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        cameraRef={cameraRef}
        isRecording={isRecording}
        onRecord={recordVideo}
        onStopRecording={stopRecording}
        videoQuality={"1080p"}
        mode="video"
        mute={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
