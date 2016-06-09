import React, { Component } from 'react';
import classes from './HomeView.scss';
import PersonCard from '../../components/PersonCard';

import SubToolbar from '../../components/SubToolbar';
import Loader from '../../components/Loader';
import { getPeople } from '../../actions/people';
import { connect } from 'react-redux';

class HomeView extends Component {
  static loadAsyncData(dispatch) {
    dispatch(getPeople());
  }
  componentDidMount(dispatch) {
    this.constructor.loadAsyncData(this.props.dispatch);
  }
  render() {
    return (
      <div className="wrap">
        <div className="row">
          { this.props.people.loading ? <Loader /> :
            this.props.people.people[0].map((p, i) => <PersonCard person={ p } />)
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
