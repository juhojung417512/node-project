import React, {
    AppRegistry,
    Component,
    Image,
    StyleSheet,
    Text,
    View,
    Image
  } from 'react-native';
import App from './App';

var movies_data = [
    {title:"title", year:"2018", posters:{thumbnail:"http://i.imgur.com/UePbdph.jpg"}}
];

var request_URL = "https"

class SendBirdProj extends Component{
    constructor(props){
        super(props);
        this.state={
            movies :null
        }
    }
    render() {
        var movie = movies_data[0];
        return(
            <View style={styles.container}>
                <Image 
                    source={movie.posters.thumbnail}
                    style={styles.thumbnail}
                />
                <View style={styles.rightcontainer}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <Text style={styles.year}>{movie.year}</Text>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'row',
    },
    rightcontainer:{
        flex:1
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    year: {
        textAlign: 'center',
    },
    thumbnail: {
        width: 53,
        height: 81,
    },
});

AppRegistry.registerComponent('SendBird', () => App);