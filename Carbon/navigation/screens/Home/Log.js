import { View, Dimensions, Text} from "react-native";
import { styles } from "./HomeScreen";
import { DailyLog } from "./ChartData";
export default function Log () 
{
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    const horizontalMargin = 20;
    return (
        <View style={{height: windowHeight/2, /*backgroundColor: Colors.primary.MINT*/}}>
        <View style={styles.marginContainer}>
            <View style={styles.headerContainer}>
          
                <Text style={styles.headerTitle}>Today's Log</Text>
            
           </View>
            <View style ={{justifyContent: 'center', alignItems: 'center', marginTop: 15,/*backgroundColor: Colors.primary.MINT*/}}>
             <DailyLog></DailyLog> 
                
            </View>
            {/*In ehre we want to add*/ }
        </View>
    </View>
    )
}