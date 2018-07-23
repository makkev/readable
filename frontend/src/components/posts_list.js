import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPost,  fetchPostCategory } from '../actions';
import Post from './post';
import '../readable.css';

class PostsList extends Component {
  componentDidMount() {
    this.props.fetchPost();
  }

  render() {
    return (
      <div className="postListMain">
        <Post />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { post: state.post };
}

export default connect(mapStateToProps, { fetchPost })(PostsList);