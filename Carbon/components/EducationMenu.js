import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'


const EducationMenu = ({title,type,setType}) => {
    const test = {
        backgroundColor: 'green'
    }
    const handlePress = () => {
        setType(title.toLowerCase())
    }
   return(
       <TouchableOpacity className = "items-center justify-center space-y-2" onPress={handlePress}>
           <View >
               <Text style = {type === title.toLowerCase() ? test:"" }>
                   {title}
               </Text>
           </View>
       </TouchableOpacity>

   )
}


export default EducationMenu
