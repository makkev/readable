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
              <div>
                <Link to={`/detail/${post.id}`}>
                  {post.title}
                </Link>
              </div>
            </div>
            <div>by {post.author}</div>
            <div>[Category: {post.category}] [Comments: {post.commentCount}] </div>

            <div className="container">
              <button className="button-vote"
                onClick={() => this.downVote(post.id)}>-</button>
              <span>Votes: {post.voteScore}</span>
              <button className="button-vote"
                 onClick={() => this.upVote(post.id)}>+</button>
            </div>    

            <Link to={`/edit/${post.id}`}>
              Edit Post
            </Link>
            <button onClick={() => this.props.removePost(post.id)}>Delete Post</button>
          </li>
      </div>
      )
    });

  }
  render() {
    return (
      <div className="postListMain">
        <div className="header">
          <div className="page-head">Post List</div> 
          <p><Link to="/create">Create New Post</Link></p>
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