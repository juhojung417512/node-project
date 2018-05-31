import React,{View, Text, StyleSheet} from 'react-native';
import createReactClass from 'create-react-class';
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#6E5BAA'
    }
});

const login= createReactClass({
    render: function(){
        return(
            <View style={style.container}>
            <Text style={style.container}> SendBird JavaScript SDK!!! </Text>
            </View>
        );
    }
})

export default login;