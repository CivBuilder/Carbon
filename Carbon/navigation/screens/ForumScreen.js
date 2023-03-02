import * as React from 'react';
import { View, Text, ScrollView, StyleSheet} from 'react-native';
import {useState, useEffect} from 'react';
import EducationMenu from '../../components/EducationMenu';


export default function ForumScreen({navigation}) {
    const getData = async() => {
        try {
            console.debug("fetching forum content");
            await fetch('http://192.168.0.150:3000/forumcontent')
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

   const [type, setType] = useState("food");
   
   const styles = StyleSheet.create({
       row: {
           flexDirection:'row'
       }
   })
   return(

   //     default stuff
   //     <View
   //         style={{
   //             flex: 1,
   //             alignItems: 'center',
   //             justifyContent: 'center'
   //         }}
   //     >
   //         <Text
   //             onPress={() =>
   //                 navigation.navigate('Home')
   //             }
   //             style={{
   //                 fontSize: 26,
   //                 fontWeight: 'bold'
   //             }}
   //         >
   //             Forum Screen
   //         </Text>
   //     </View>


       <ScrollView>
           <View style ={{flex: 3, flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 50 }}>
               <EducationMenu
                   key={"food"}
                   title = "Food"

                    type ={type}
                    setType = {setType}
                />
                <EducationMenu
                    key={"transportation"}
                    title = "Transportation"
                    type ={type}
                    setType = {setType}

               />
               <EducationMenu
                   key={"recycling"}
                   title = "Recycling"
                    type ={type}
                    setType = {setType}
               />
               <EducationMenu
                   key={"water"}
                   title = "Water"
                    type ={type}
                    setType = {setType}
               />
               <EducationMenu
                   key={"electricity"}
                   title = "Electricity"

                    type ={type}
                    setType = {setType}
                />
            </View>
        </ScrollView>
    )
}

