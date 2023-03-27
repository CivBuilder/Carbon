import React, { Component } from 'react'
import {WebView} from 'react-native-webview'
import{ View, TouchableOpacity, Text} from 'react-native'

const BackButton = ({navigation}) =>
<TouchableOpacity onPress={() => {
    navigation.goBack()
}}>
    <Text>&lt; Back</Text>
</TouchableOpacity>


export default class BrowserScreen extends Component {

    // static navigationOptions = ({ navigation }) => ({
    //     title: 'Browser',
    //     headerLeft: <BackButton navigation={navigation}/>
    // })

    render() {
        return(
            <View style = {{flex:1}}>
                <WebView source = {{ 
                    uri: 'https://johnxu21.github.io/teaching/CS472-Spring2023/'
                    //uri: this.props.navigation.state.parms.url this will be used later with other links
                }}
                style={{flex:1}}
                />
            </View>
        )
    }
}