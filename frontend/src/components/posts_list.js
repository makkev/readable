import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts, addPost } from '../actions';
import '../readable.css';

class PostsList extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return Object.values(this.props.posts).map(post => {
      return (
        <div key={post.id}>
          <li>
            <p>{post.title}</p>
            <p>by {post.author}</p>
            <p>[Category: {post.category}] [Vote Score: {post.voteScore}] [Comments: {post.commentCount}] </p>
            <p>{post.body}</p>
          </li>
      </div>
      )
    });

  }
  render() {
    return (
      <div className="postListMain">
        <div className="header">
          <h2>Posts</h2> 
          <Link to="/create">Create New</Link>
        </div>
        <ul className="theList">
          {this.renderPosts()}
        </ul>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts, addPost })(PostsList);