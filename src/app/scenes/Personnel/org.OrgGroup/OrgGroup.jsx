import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bem-grid';
import PersonCard from '../mol.PersonCard';
import CardGroup from 'shared/org.CardGroup';
import Card from 'shared/atm.Card';
import { BossCard } from 'components/index';

const rowstyle = {
  flexWrap: 'wrap'
}
const buttonStyles = {
      padding: 10,
      fontSize: 20,
      marginBottom: 10,
    };

const OrgGroup = (props) => {
    return (
      <div>
        { props.toolbar }
        <Row>
          <Col xs>
            { props.boss }
          </Col>
        </Row>
          <CardGroup>
            {
              props.persons.map((p, i, props) => {
                return (
                  <Card key={p.id}>
                    <PersonCard person={p} />
                  </Card>
                );
              })
            }
          </CardGroup>
      </div>
    );
}

export default OrgGroup;
