import { Pressable, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SectionCSS as styling } from "../styling/SectionCSS";

export const Section = (props) => {
  const {children, cardView, title, shortcutURL, shortcutTitle} = props;
  let toggleCardView = (cardView === undefined) ? true : cardView;

  return (
    <>
      <View style={styling.header}>
        <Text style={styling.title}>{title}</Text>
        {(shortcutURL && shortcutTitle) && <Shortcut screenName={shortcutURL} text={shortcutTitle}/>}
      </View>
      <View style={toggleCardView ? styling.container : null}>
        <View style={[toggleCardView ? styling.body : null]}>
          <View style={toggleCardView ? styling.content : null}>{children}</View>
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