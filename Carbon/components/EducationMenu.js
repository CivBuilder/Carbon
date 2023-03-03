import {View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'


const EducationMenu = ({title,type,setType,imageSrc}) => {
    const test = {
        backgroundColor: '#43b262'
    }
    const handlePress = () => {
        setType(title.toLowerCase())
    }
   return(
       <TouchableOpacity style =  {{flexDirection: 'column', alignItems:'center'}} onPress={handlePress}>
           <View>
                <Image style = {{resizeMode: 'contain', height: 100, width: 100}} source={imageSrc} />
           </View>
               <Text style = {type === title.toLowerCase() ? test:"" }>
                   {title}
               </Text>
   
       </TouchableOpacity>

   )
}


export default EducationMenu
