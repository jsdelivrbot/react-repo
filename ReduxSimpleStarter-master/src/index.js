import React, { Component } from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyBczto2_bq7MbJaukEqVkAWxrJXKnBGDvQ';

class App extends Component {
    
    constructor(props){
        super(props);
        this.state = { 
            videos : [],
            selectedVideo : null};
        
       this.videoSearch('fashion haul');
    }
    
    videoSearch(term){
        YTSearch({key : API_KEY, term : term}, (videos) =>{
            this.setState(
                {videos : videos, // this.setState({videos : videos})
                 selectedVideo : videos[0]
                }); 
            console.log(videos);
        }); 
    }
    
    render(){
        const videoSearch = _.debounce((term) => {this.videoSearch(term)},5000);
        
        return(
        <div>
            <SearchBar onSearchTermChange = {videoSearch} />
            <VideoDetail video = {this.state.selectedVideo} />
            <VideoList 
             onVideoSelect = {(selectedVideo)=>this.setState({selectedVideo})}
             videos = {this.state.videos} />
        </div>
        );
    }
}
           
ReactDOM.render(<App/>, document.querySelector('.container'));