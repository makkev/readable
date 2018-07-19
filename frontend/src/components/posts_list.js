import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts, addPost } from '../actions';

class PostsList extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return Object.values(this.props.posts).map(post => {
      return (
        <div key={post.id}>
          <p>{post.title}</p>
          <p>{post.author}</p>
          <p>{post.body}</p>
          <p>{post.category}</p>
          <p>{post.voteScore}</p>
          <p>{post.commentCount}</p>
          <hr/>
        </div>
      )
    });

  }
  render() {
    return (
      <div>
      <Link to="/create">Create New</Link>
       <h2>Posts</h2> 
       <div>
        {this.renderPosts()}
       </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts, addPost })(PostsList);