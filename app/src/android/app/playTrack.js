'use strict';

import React, {Component} from 'react';
import {
    WebView,
	StyleSheet,
    Text,
	View,
    TouchableHighlight,
	TouchableWithoutFeedback,	
	ScrollView,
	Dimensions
} from 'react-native';

class PlayTrack extends Component {
    constructor(props) {
        super(props);
		
		this.state = {
			url: ''
		};
		
		if (props.data) {
			this.state = {
				name: props.data.name,
				url: props.data.url,
				html: 'https://www.facebook.com/wikrcom/videos/1118835278260392/'
			}
		}
    }

    componentDidMount() {
        this.setState({
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width
        });
    }
	
	goBack() {
		this.props.navigator.pop();
	}
	
    render() {
        return (
				<View style={styles.container}>
					<View style={styles.header}>
						<View>
							<TouchableHighlight
								onPress={()=> this.goBack()}
								underlayColor='darkblue'
							>
								<Text style={styles.textSmall}>
									Back
								</Text>
							</TouchableHighlight>	
						</View>
						<View style={styles.itemWrap}>
							<TouchableHighlight
								underlayColor='darkblue'
							>
								<Text style={styles.textLarge}>
									{this.state.name}
								</Text>
							</TouchableHighlight>	
						</View>						
						<View>
							<TouchableHighlight
								underlayColor='darkblue'
							>
								<Text style={styles.textSmall}>
								</Text>
							</TouchableHighlight>	
						</View>
					</View>
				
				<ScrollView>
					<View style={{alignItems: 'center'}}>
						<WebView
							source={{uri: this.state.url}}
							mediaPlaybackRequiresUserAction={false}
							style={{
								height: this.state.height * .80, 
								width: this.state.width * .99,
							}}
						/>
					</View>	
				</ScrollView>	
			</View>	
        )
    }
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		justifyContent: 'center', 
		backgroundColor: 'black'
	},		
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		//backgroundColor: '#48BBEC',
		backgroundColor: 'darkblue',
		borderWidth: 0,
		borderColor: 'whitesmoke'
	},	
	textSmall: {
		fontSize: 16,
		textAlign: 'center',
		margin: 14,
		fontWeight: 'bold',
		color: 'white'
	},		
	textLarge: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
		marginRight: 40,
		fontWeight: 'bold',
		color: 'white'
	},	
    form: {
		flex: 1,
		padding: 10,
		justifyContent: 'flex-start',
		paddingBottom: 130,
		backgroundColor: 'white'
    },
 	itemWrap: {
		flex: 1,
		flexDirection: 'column', 
		flexWrap: 'wrap'
    },	
    itemTextBold: {
        fontSize: 18,
        textAlign: 'center',
        margin: 5,
        fontWeight: 'bold',
		color: 'black'
    },  
	itemText: {
        fontSize: 14,
        textAlign: 'center',
        margin: 3,
        marginLeft: 2,
        color: 'black'
    },	
	itemTextSmallBold: {
        fontSize: 14,
        textAlign: 'center',
        margin: 3,
        marginLeft: 2,
		fontWeight: 'bold',
        color: 'black'
    },
    button: {
        height: 50,
        //backgroundColor: '#48BBEC',
        backgroundColor: 'darkblue',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
		fontWeight: 'bold'
    },
    loader: {
        marginTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default PlayTrack;