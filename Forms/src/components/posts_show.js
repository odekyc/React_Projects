import React, { Component } from 'react';

class PostsShow extends Component{

	render(){
		return <div>show posts {this.props.params.id}</div>;
	}
}

export default PostsShow;