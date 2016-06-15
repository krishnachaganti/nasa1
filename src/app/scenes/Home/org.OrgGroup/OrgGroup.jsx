import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bem-grid';
import PersonCard from '../mol.PersonCard';
import { BossCard } from 'components/index';
import { getITA, getITB, getITC, getITD } from 'state/org/org';

class OrgGroup extends Component {

  static readyOnActions(dispatch) {
    return Promise.all([
      dispatch(getITA()),
      dispatch(getITB()),
      dispatch(getITC()),
      dispatch(getITD())
    ]);
  }
  componentDidMount() {
    OrgGroup.readyOnActions(this.props.dispatch);
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
        <Row>
          <Col xs>
            { this.props.boss }
          </Col>
        </Row>
        <Row>
          <Col xs>
            { CardCollection }
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    org: state.orgReducer,
    ita: state.orgReducer.ita,
    itb: state.orgReducer.itb,
    itc: state.orgReducer.itc,
    itd: state.orgReducer.itd
  };
};

OrgGroup.propTypes = {

};
export default connect(mapStateToProps, null)(OrgGroup);
