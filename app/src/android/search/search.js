'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ScrollView,
    TextInput,
    Switch,
    Dimensions
} from 'react-native';

import {AdMobBanner} from 'react-native-admob';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showProgress: false,
            eventSwitchTitle: true,
            eventSwitchBase: false,
            eventSwitchBaseMovies: true,
            eventSwitchBaseType: false,
            textSwitchBase: 'Search music',
            textSwitchBaseMovies: 'Search movies',
            textSwitchBaseType: 'Music',
            bugANDROID: ''
        }
    }

    componentDidMount() {
        this.setState({
            width: Dimensions.get('window').width
        });
    }

    clearSearch() {
        this.setState({
            searchQuery: '',
            invalidValue: false
        })
    }

    onSearchPressed() {
        if (this.state.searchQuery === undefined ||
            this.state.searchQuery === '') {
            this.setState({
                invalidValue: true
            });
            return;
        }
		
		if (this.state.textSwitchBaseType === 'Music') {
			if (this.state.textSwitchBase === 'Search clips') {
				this.props.navigator.push({
					index: 1,
					data: {
						searchQuery: this.state.searchQuery,
						searchType: 'musicVideo'
					}
				})
			} else {
				this.props.navigator.push({
					index: 1,
					data: {
						searchQuery: this.state.searchQuery,
						searchType: 'music'
					}
				})
			}
		} else {
			if (this.state.textSwitchBaseMovies === 'Search movies') {
				this.props.navigator.push({
					index: 2,
					data: {
						searchQuery: this.state.searchQuery,
						searchType: 'movie'
					}
				})
			} else {
				this.props.navigator.push({
					index: 2,
					data: {
						searchQuery: this.state.searchQuery,
						searchType: 'tvShow'
					}
				})
			}			
		}
    }

    toggleTypeChangeType() {
        if (this.state.eventSwitchBaseType) {
            this.setState({
                textSwitchBaseType: 'Music'
            });
        } else {
            this.setState({
                textSwitchBaseType: 'Movies'
            });
        }
    }
	
    toggleTypeChange() {
        if (this.state.eventSwitchBase) {
            this.setState({
                textSwitchBase: 'Search music'
            });
        } else {
            this.setState({
                textSwitchBase: 'Search clips'
            });
        }
    }	
	
    toggleTypeChangeMovies() {
        if (!this.state.eventSwitchBaseMovies) {
            this.setState({
                textSwitchBaseMovies: 'Search movies'
            });
        } else {
            this.setState({
                textSwitchBaseMovies: 'Search TV Series'
            });
        }
    }

    goBack() {
        this.props.navigator.pop();
    }

    render() {
        let validCtrl, showBlock;

        if (this.state.invalidValue) {
            validCtrl = <Text style={styles.error}>
                Value required - please provide.
            </Text>;
        }
		
        if (this.state.eventSwitchBaseType) {
            showBlock = <View style={styles.switchBlock}>
				<View>
					<Text style={styles.switchItemText}>
						{this.state.textSwitchBaseMovies}
					</Text>
				</View>

				<View style={styles.switchItem}>
					<Switch
						onValueChange={(value) => {
							this.toggleTypeChangeMovies();
							this.setState({
								eventSwitchBaseMovies: value
							});
						}}
						value={this.state.eventSwitchBaseMovies}
					/>
				</View>
			</View>;
        } else {
            showBlock = <View style={styles.switchBlock}>
				<View>
					<Text style={styles.switchItemText}>
						{this.state.textSwitchBase}
					</Text>
				</View>

				<View style={styles.switchItem}>
					<Switch
						onValueChange={(value) => {
							this.toggleTypeChange();
							this.setState({
								eventSwitchBase: value
							});
						}}
						value={this.state.eventSwitchBase}
					/>
				</View>
			</View>;
		}
		
        return (
            <View style={styles.adcontainer}>
				<View style={styles.container}>
					<View style={styles.header}>
						<View>
							<TouchableHighlight
								onPress={()=> this.goBack()}
								underlayColor='darkblue'
							>
								<View>
									<Text style={styles.textSmall}>
									</Text>
								</View>
							</TouchableHighlight>
						</View>
						<View>
							<TouchableWithoutFeedback>
								<View>
									<Text style={styles.textLarge}>
										Search
									</Text>
								</View>
							</TouchableWithoutFeedback>
						</View>
						<View>
							<TouchableHighlight
								onPress={()=> this.clearSearch()}
								underlayColor='darkblue'
							>
								<View>
									<Text style={styles.textSmall}>
										Clear
									</Text>
								</View>
							</TouchableHighlight>
						</View>
					</View>

					<ScrollView keyboardShouldPersistTaps='always'>
						<View style={styles.scrollBlock}>
							<View style={styles.switchBlock}>
								<View>
									<Text style={styles.switchItemText}>
										{this.state.textSwitchBaseType}
									</Text>
								</View>

								<View style={styles.switchItem}>
									<Switch
										onValueChange={(value) => {
											this.toggleTypeChangeType();
											this.setState({
												eventSwitchBaseType: value
											});
										}}
										value={this.state.eventSwitchBaseType}
									/>
								</View>
							</View>   
							
							{showBlock}

							<View style={styles.inputBlock}>
								<TextInput
									underlineColorAndroid='rgba(0,0,0,0)'
									onChangeText={(text) => this.setState({
										searchQuery: text,
										invalidValue: false
									})}
									value={this.state.searchQuery}
									style={{
										height: 50,
										width: this.state.width * .94,
										fontSize: 18,
										color: 'darkblue',
										paddingTop: 6
									}}
									placeholderTextColor="darkblue"
									placeholder="Search here">
								</TextInput>
							</View>

							{validCtrl}

							<TouchableHighlight
								onPress={() => this.onSearchPressed()}
								style={styles.button}>
								<Text style={styles.buttonText}>
									Submit
								</Text>
							</TouchableHighlight>
						</View>
					</ScrollView>
				</View>
				
				<View style={styles.banner}>
				</View>
			</View>
        )
    }
}
/*
<AdMobBanner adUnitID="ca-app-pub-4884500146569199/5596319463"/>
<Text>
	Banner
</Text>
*/
const styles = StyleSheet.create({
    adcontainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },    
	container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
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
        paddingLeft: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    scrollBlock: {
        flex: 1,
        padding: 10,
        marginTop: 10,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    switchBlock: {
        height: 50,
        borderWidth: 1,
        //borderColor: '#48BBEC',
        borderColor: 'darkblue',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 5,
		marginBottom: 10
    },
    switchItem: {
        marginTop: 10,
        margin: 10
    },
    switchItemText: {
        fontSize: 18,
        marginTop: 10,
        margin: 10,
		color: 'darkblue'
    },
    inputBlock: {
        height: 50,
        marginTop: 0,
        borderWidth: 1,
        //borderColor: '#48BBEC',
        borderColor: 'darkblue',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 5,
        paddingLeft: 6
    },
    button: {
        height: 50,
        //backgroundColor: '#48BBEC',
        backgroundColor: 'darkblue',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 19,
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
        justifyContent: 'center',
        height: 100
    },
    error: {
        color: 'red',
        paddingTop: 10,
		marginBottom: -6,
        textAlign: 'center'
    },
    banner: {
        //borderWidth: 1,
        borderColor: 'darkblue'
    },	
});

export default Search;