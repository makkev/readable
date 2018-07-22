import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Comments from './comments';
import { getPost, editPost, postVoteDetail, listComments, postComment, removeComment } from '../actions';

const UPVOTE = 'upVote';
const DOWNVOTE = 'downVote';


class PostsDetail extends Component {

  state = {
    showNewComment: false,
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
    this.props.listComments(this.props.match.params.id);
  }

  renderNewComment = () => {
    this.setState({ showNewComment: true });
  }

  unrenderNewComment = () => {
    this.setState({ showNewComment: false });
  }

  editPost(e) {
    const thePost = {
      id: this.props.match.params.id,
      title: this._inputTitle.value,
      body: this._inputBody.value,
    }
    this.props.editPost(thePost);
    window.location.assign('/');
  }

  upVote(id) {
    this.props.postVoteDetail(id, { option: UPVOTE });
  }

  downVote(id) {
    this.props.postVoteDetail(id, { option: DOWNVOTE });
  }

  render() {
    return (
      <div className="postListMain">
        <h3>Post Details</h3>
          <div className="title">
            <p>{this.props.post.title}</p>
          </div>
          <p>by {this.props.post.author}</p>
          <p>[Category: {this.props.post.category}] [Comments: {this.props.post.commentCount}] </p>
          <p>{this.props.post.body}</p>
          <div className="container">
            <button className="buttons"
              onClick={() => this.downVote(this.props.post.id)}>-</button>
            <span>Votes: {this.props.post.voteScore}</span>
            <button className="buttons"
                onClick={() => this.upVote(this.props.post.id)}>+</button>
          </div>
          <button className="buttons" onClick={(a) => this.renderNewComment() }>Add Comments</button>

          {this.state.showNewComment ? 
            <NewComment 
              unrenderNewComment={this.unrenderNewComment} 
              postComment={this.props.postComment}
              postId={this.props.post.id}
            /> : null}

          <Comments 
            comments={this.props.comment}
            removeComment={this.props.removeComment}
          />


      </div>
    );
  };
}

function Comments(props) {
  return (
    <div className="postListMain">
      <ul className="theList">
        {Object.values(props.comments).map(comment => (
          <li key={comment.id}>
            <div>{comment.body}</div>
            <div>{comment.author}</div>
            <div>{comment.voteScore}</div>
            <button onClick={() => props.removeComment(comment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

class NewComment extends Component {
  postComment = () => {
    this.props.postComment({ 
      body: this.comment.value,
      author: this.author.value,
      parentId: this.props.postId,
    });
    this.props.unrenderNewComment()

  }
  render() {
    return (
      <div>
        <ul className="theList">
          <li>
            <p>Comment:</p>
            <p>
              <input ref={(a) => this.comment = a}
                type="text" placeholder="Comment" autoFocus
              />
            </p>
            <p> Author:</p>
            <p>
              <input ref={(a) => this.author = a}
                type="text" placeholder="Author"
              />
            </p>
            <button onClick={() => this.postComment()}>Save</button>
            <button onClick={() => this.props.unrenderNewComment()}>Cancel</button>
          </li>
        </ul>
      </div>
    );
  };
} 

function mapStateToProps(state) {
  return { 
    post: state.post,
    comment: state.comment 
  };
}

export default connect(mapStateToProps,
  { getPost, editPost, postVoteDetail, listComments, postComment, removeComment })(PostsDetail);

