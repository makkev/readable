import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPost, addPost, postVote, removePost } from '../actions';
import Post from './post';
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

  render() {
    return (
      <div className="postListMain">
        <div className="header">
          <div className="page-head">Post List</div> 
          <p><Link to="/create">Create New Post</Link></p>
        </div>
        <Post post={this.props.post}/>
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