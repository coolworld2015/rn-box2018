'use strict';

import React, {Component} from 'react';
import NavigationExperimental from 'react-native-deprecated-custom-components';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

import Search from '../search/search';
 
import SearchDetails from '../search/searchDetails';
import SearchDetailsMovies from '../search/searchDetailsMovies';
 

import SearchResults from '../search/searchResults';
import SearchResultsMovies from '../search/searchResultsMovies';

import Movies from '../movies/movies';
import MoviesDetails from '../movies/moviesDetails';

import PlayTrack from './playTrack';

class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollableTabView
                renderTabBar={() => <DefaultTabBar 
					activeTextColor='darkblue' 
					inactiveTextColor='darkblue' 
 					underlineStyle={{backgroundColor: 'darkblue'}}
					backgroundColor='white'/>}
            >
                <SearchTab tabLabel="Search"/>
                <MoviesTab tabLabel="Music"/>
            </ScrollableTabView>
        );
    }
}

class MoviesTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Movies', index: 0},
			{title: 'Movies Details', index: 1},
			{title: 'Web', index: 2}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Movies routes={this.routes} navigator={navigator} />
					break;			
			case 1: return <MoviesDetails data={route.data} routes={this.routes} navigator={navigator} />
					break;			
			case 2: return <PlayTrack data={route.data} routes={this.routes} navigator={navigator} />
					break;
 		}
 	}	
	
	render() {
		return (
	  		<NavigationExperimental.Navigator
				initialRoute={this.routes[0]}
				initialRouteStack={this.routes}
				renderScene={this.renderScene.bind(this)}
				style={{padding: 0}}
			  
				configureScene={(route, routeStack) =>
					NavigationExperimental.Navigator.SceneConfigs.PushFromRight}
			/>
		)
	}
}

class SearchTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Search', index: 0},
			{title: 'Search Artist', index: 1},
			{title: 'Search Details', index: 2},
			{title: 'Search Top Track', index: 3},
			{title: 'Search Track', index: 4},
			{title: 'Play Track', index: 5}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Search routes={this.routes} navigator={navigator} />
					break;			
			case 1: return <SearchResults data={route.data} routes={this.routes} navigator={navigator} />
					break;				
			case 11: return <SearchDetails data={route.data} routes={this.routes} navigator={navigator} />
					break;			
			case 2: return <SearchResultsMovies data={route.data} routes={this.routes} navigator={navigator} />
					break;			
			case 22: return <SearchDetailsMovies data={route.data} routes={this.routes} navigator={navigator} />
					break;	
			case 3: return <PlayTrack data={route.data} routes={this.routes} navigator={navigator} />
					break;					
 		}
 	}

    render() {
        return (
            <NavigationExperimental.Navigator
                initialRoute={this.routes[0]}
                initialRouteStack={this.routes}
                renderScene={this.renderScene.bind(this)}
                configureScene={(route, routeStack) =>
                    NavigationExperimental.Navigator.SceneConfigs.PushFromRight}
            />
        )
    }
}

export default AppContainer;