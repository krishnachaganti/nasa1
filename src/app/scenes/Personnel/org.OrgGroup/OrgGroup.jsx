import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bem-grid';
import PersonCard from '../mol.PersonCard';
import CardGroup from 'shared/org.CardGroup';

import Card from 'shared/atm.Card';
import { BossCard } from 'components/index';
import { getITA, getITB, getITC, getITD } from 'state/org/org';

const rowstyle = {
  flexWrap: 'wrap'
}
const buttonStyles = {
      padding: 10,
      fontSize: 20,
      marginBottom: 10,
    };

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
              <Card key={ i }>
                <PersonCard person={ p } />
              </Card>
              );
        break;
      case 'b':
        CardCollection = this.props.org.itb.map((p, i) =>
              <Card key={ i }>
                <PersonCard person={ p } />
              </Card>
              );
        break;
      case 'c':
        CardCollection = this.props.org.itc.map((p, i) =>
            <Card key={ i }>
                <PersonCard person={ p } />
            </Card>
            );
        break;
      case 'd':
        CardCollection = this.props.org.itd.map((p, i) =>
            <Card key={ i }>
                <PersonCard person={ p } />
            </Card>
            );
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
          <CardGroup>
            { CardCollection }
          </CardGroup>
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
