import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostCategory } from '../actions';
import Post from './post';
import '../readable.css';

class PostsListCategory extends Component {
  // state = { category: this.props.match.params.category }
  componentDidMount() {
    this.props.fetchPostCategory(this.props.match.params.category);
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

export default connect(mapStateToProps, { fetchPostCategory })(PostsListCategory);