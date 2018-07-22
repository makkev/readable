import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listComments } from '../actions';

class Comments extends Component {
  // componentDidMount() {
    // console.log(this.props.postid);
    // this.props.listComments(this.props.postid);
  // }
  render() {
    // console.log(this.props);
    // this.props.listComments(this.props.postid);
    const { comment } = this.props;
    return (
      <div className="postListMain">
        <ul className="theList">
          {Object.values(comment).map(comment => (
            <li key={comment.id}>
              <p>{comment.body}</p>
              <p>{comment.author}</p>
              <p>{comment.voteScore}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
//temp
// <Comments comments={Object.values(this.props.comment)} />
function mapStateToProps(state) {
  return { 
    comment: state.comment 
  };
}

export default connect(mapStateToProps,
  { listComments })(Comments);