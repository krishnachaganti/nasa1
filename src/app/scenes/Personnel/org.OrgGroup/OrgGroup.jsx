import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bem-grid';
import PersonCard from '../mol.PersonCard';
import CardGroup from 'shared/org.CardGroup';

import Card from 'shared/atm.Card';
import { BossCard } from 'components/index';
import { getITA, getITB, getITC, getITD } from 'state/org/org';
import { getPeople } from 'state/people/people';
const rowstyle = {
  flexWrap: 'wrap'
}
const buttonStyles = {
      padding: 10,
      fontSize: 20,
      marginBottom: 10,
    };

class OrgGroup extends Component {

  // static readyOnActions(dispatch) {
  //   return Promise.all([
  //     dispatch(getITA()),
  //     dispatch(getITB()),
  //     dispatch(getITC()),
  //     dispatch(getITD())
  //   ]);
  // }
  //
  // componentDidMount() {
  //   OrgGroup.readyOnActions(this.props.dispatch);
  // }
  // static readyOnActions(dispatch) {
  //   return Promise.all([
  //     dispatch(getPeople())
  //   ]);
  // }
  //
  // componentDidMount() {
  //   OrgGroup.readyOnActions(this.props.dispatch);
  // }

  render() {
    return (
      <div>
        { this.props.toolbar }
        <Row>
          <Col xs>
            { this.props.boss }
          </Col>
        </Row>
          <CardGroup>
            {
              this.props.persons.map((p, i) => {
                return (
                  <Card key={i}>
                    <PersonCard person={p} />
                  </Card>
                );
              })
            }
          </CardGroup>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    people: state.peopleReducer
  };
};

OrgGroup.propTypes = {

};
export default connect(mapStateToProps, null)(OrgGroup);
