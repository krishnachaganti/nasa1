import React, { Component } from 'react';
import { connect } from 'react-redux';
import PersonCard from '../../components/PersonCard';
import BossCard from '../../components/BossCard';
import { getITA, getITB, getITC, getITD } from '../../actions/org';
import Dialog from 'material-ui/Dialog';

class OrgGroup extends Component {
  static loadAsyncData(dispatch) {
    dispatch(getITA());
    dispatch(getITB());
    dispatch(getITC());
    dispatch(getITD());
  }

  componentDidMount(dispatch) {
    this.constructor.loadAsyncData(this.props.dispatch);
  }

  render() {
    let CardCollection;
    switch (this.props.orgType) {
      case 'a':
        CardCollection = this.props.org.ita.map((p, i) =>
              <PersonCard key={ i } person={ p } />);
        break;
      case 'b':
        CardCollection = this.props.org.itb.map((p, i) =>
              <PersonCard key={ i } person={ p }/>);
        break;
      case 'c':
        CardCollection = this.props.org.itc.map((p, i) =>
              <PersonCard key={ i } person={ p }/>);
        break;
      case 'd':
        CardCollection = this.props.org.itd.map((p, i) =>
              <PersonCard key={ i } person={ p }/>);
        break;
      default:
        throw new Error('CardCollection is not valid');
    }
    return (
      <div>
      { this.props.toolbar }
      <div className="row">
      <div className="col-xs">
      { this.props.boss }
      </div>
      </div>
      <div className="row">
      { CardCollection }
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    org: state.org,
    ita: state.org.ita,
    itb: state.org.itb,
    itc: state.org.itc,
    itd: state.org.itd
  };
};

OrgGroup.propTypes = {

};
export default connect(mapStateToProps, null)(OrgGroup);
