import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component{

	componentWillMount(){

		this.props.fetchPost(this.props.params.id);

	}

	render(){
		if (!this.props.post){
			return <div>Loading....</div>;
		}

		const post=this.props.post;

		return (<div>
			<Link to="/">Back To Index</Link>
		<h3>{post.title}</h3>
		<h6>Categories: {post.categories}</h6>
         <p> { post.content }</p>
		</div>

		);
	}
}

function mapStateToProps(state){
	return { post: state.posts.post };
}

export default connect( mapStateToProps, { fetchPost } )(PostsShow);