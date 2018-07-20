import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPost, addPost } from '../actions';
import '../readable.css';

class PostsList extends Component {
  componentDidMount() {
    this.props.fetchPost();
  }

  renderPost() {
    return Object.values(this.props.post).map(post => {
      return (
        <div key={post.id}>
          <li key={post.id}>
            <p>{post.title}</p>
            <p>by {post.author}</p>
            <p>[Category: {post.category}] [Vote Score: {post.voteScore}] [Comments: {post.commentCount}] </p>
            <p>{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              Edit Post
            </Link>
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
          {this.renderPost()}
        </ul>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return { post: state.post };
}

export default connect(mapStateToProps, { fetchPost, addPost })(PostsList);