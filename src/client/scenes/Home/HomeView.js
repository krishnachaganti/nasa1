import React, { Component } from 'react';
import classes from './HomeView.scss';
import PersonCard from '../../components/PersonCard';
import FilterLink from './components/FilterLink';
import SubToolbar from '../../components/SubToolbar';
import Loader from '../../components/Loader';
import { getPeople } from '../../actions/people';
import { connect } from 'react-redux';
import SearchInput, { createFilter } from 'react-search-input';

import configureStore from '../../store/createStore';

const KEYS_TO_FILTERS = ['OrgCode'];

class HomeView extends Component {
  static loadAsyncData(dispatch) {
    dispatch(getPeople());
  }
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
  }
  componentDidMount(dispatch) {
    this.constructor.loadAsyncData(this.props.dispatch);
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }
  render() {
    const filteredPeople = this.props.people.people[0].filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    return (
      <div className="wrap">
        <SearchInput className="search-input" onChange={::this.searchUpdated} />
        <div className="row">
          { this.props.people.loading ? <Loader /> :
            filteredPeople.map((p, i) => <PersonCard key={ i } person={ p } />)
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    people: state.people
  };
};

HomeView.propTypes = {

};
export default connect(mapStateToProps, null)(HomeView);
