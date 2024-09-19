import { Button, SafeAreaView, View } from "react-native";
import { Video } from "expo-av";
import { VideoPlayerProps } from "./props";
import { styles } from "./styles";

export default function VideoPlayer({
  video,
  onSave,
  onShare,
  onDiscard,
}: VideoPlayerProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Video style={styles.video} source={video} useNativeControls isLooping />
      <View style={styles.menuButtons}>
        <Button title="Share" onPress={onShare} />
        <Button title="Save" onPress={onSave} />
        <Button title="Discard" onPress={onDiscard} />
      </View>
    </SafeAreaView>
  );
}
