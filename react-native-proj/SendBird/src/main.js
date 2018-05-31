import React, {StyleSheet} from 'react-native';
import {Navigator} from 'react-native-custom-components';
import createReactClass from 'create-react-class';
import Login from './components/login';

const ROUTES = {
    login: Login
};

const styles = StyleSheet.create({
    container:{
        flex:1
    }
});

const main = createReactClass({
    renderScene: function(route,navigator){
        var Component = ROUTES[route.name];
        return <Component route={route} navigator={navigator} />;
    } ,
    render : function(){
        return(
            <Navigator 
                style={styles.container}
                initialRoute={{name:'login'}}
                renderScene={this.renderScene}
                configureScene={()=>{return Navigator.SceneConfigs.FloatFromRight;}}
            />
        );
    }
})

export default main;