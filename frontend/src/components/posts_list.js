import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPost, addPost, postVote, removePost } from '../actions';
import '../readable.css';

const UPVOTE  = 'upVote';
const DOWNVOTE  = 'downVote';

class PostsList extends Component {
  componentDidMount() {
    this.props.fetchPost();
  }

  upVote(id) {
    this.props.postVote(id, { option: UPVOTE });
  }

  downVote(id) {
    this.props.postVote(id, { option: DOWNVOTE });
  }

  renderPost() {
    return Object.values(this.props.post).map(post => {
      return (
        <div key={post.id}>
          <li key={post.id}>
            <div className="title">
              <p>{post.title}</p>
            </div>
            <p>by {post.author}</p>
            <p>[Category: {post.category}] [Comments: {post.commentCount}] </p>
            <p>{post.body}</p>

            <div className="container">
              <button className="buttons"
                onClick={() => this.downVote(post.id)}>-</button>
              <span>Votes: {post.voteScore}</span>
              <button className="buttons"
                 onClick={() => this.upVote(post.id)}>+</button>
            </div>    

            <Link to={`/edit/${post.id}`}>
              Edit Post
            </Link>
            <button onClick={() => this.props.removePost(post.id)}>Delete</button>
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

export default connect(mapStateToProps,
  { fetchPost, addPost, postVote, removePost }
)(PostsList);