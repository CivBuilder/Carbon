import { Pressable, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SectionCSS as styling } from "../styling/SectionCSS";

export const Section = (props) => {
  const {children, height, title, shortcutURL, shortcutTitle} = props;
  let bodyHeight = (!height || !Number.isInteger(height)) ? 50 : height;

  return (
    <>
      <View style={styling.header}>
        <Text style={styling.title}>{title}</Text>
        {(shortcutURL && shortcutTitle) && <Shortcut screenName={shortcutURL} text={shortcutTitle}/>}
      </View>
      <View style={styling.container}>
        <View style={[styling.body, {minHeight: bodyHeight}]}>
          <View style={styling.content}>{children}</View>
        </View>
      </View>
    </>
  );
};

const Shortcut = (props) => {
  const {screenName, text} = props;
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate(screenName)}>
      <Text style={styling.shortcut}>{text}</Text>
    </Pressable>
  );
};