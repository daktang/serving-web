import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  //모든 DOM eventHandler = event object를 가져온다.
  onInputChange(event) {
    console.log(event.target.value);
    this.setState({ term: event.target.value });
  }

  //사용자의 입력은 항상 form을 사용하기를 권장하며, 항상 첫 개발에서는 아래와 같이 폼 제출을 막게 하기를 바란다.
  onFormSubmit(event) {
    event.preventDefault();
    this.props.fetchWeather(this.state.term);
    this.setState({ term: '' });
  }
  
  render() {
    return (
      <form onSubmit={this.onFormSubmit} className='input-group'>
        <input 
          placeholder='Get a five-day forecast in your favorite cities.'
          className='form-control'
          value={this.state.term}
          onChange={this.onInputChange} />
        <span className='input-group-btn'>
          <button type='submit' className='btn btn-secondary'>Submit</button>
        </span>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWeather }, dispatch)
}

export default connnect(null, mapDispatchToProps)(SearchBar)
