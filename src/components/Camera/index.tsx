import { Button, Text, TouchableOpacity, View } from "react-native";
import {
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";

import { CameraProps } from "./props";
import { styles } from "./styles";

export default function Camera({
  cameraRef,
  videoQuality,
  mode,
  mute,
  isRecording,
  onRecord,
  onStopRecording,
}: CameraProps) {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] =
    useMicrophonePermissions();

  if (!cameraPermission || !microphonePermission) {
    // Camera/Microphone permissions are still loading.
    return <View />;
  }

  if (!cameraPermission.granted || !microphonePermission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          margin: 5,
        }}
      >
        <Text>Precisamos da sua permissão para utililzar a câmera</Text>
        <Button onPress={requestCameraPermission} title="Permitir" />
        <Text>Precisamos da sua permissão para utililzar o microphone</Text>
        <Button onPress={requestMicrophonePermission} title="Permitir" />
      </View>
    );
  }

  return (
    <CameraView
      ref={cameraRef}
      style={styles.container}
      videoQuality={videoQuality}
      mute={mute}
      mode={mode}
      //facing="back"
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={isRecording ? onStopRecording : onRecord}
          style={styles.buttonRecord}
        >
          <Text style={styles.buttonText}>
            {isRecording ? "Stop Record" : "Start Record"}
          </Text>
        </TouchableOpacity>
      </View>
    </CameraView>
  );
}
