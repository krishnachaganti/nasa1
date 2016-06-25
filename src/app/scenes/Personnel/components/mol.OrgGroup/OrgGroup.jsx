import React, { Component } from 'react';
import { connect } from 'react-redux';
import PersonCard from '../org.PersonCard';
import CardGroup from 'shared/org.CardGroup';
import Card from 'shared/atm.Card';
import BCardWrap from '../atm.BCardWrap';

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
        <div className="row">
          <div className="col-xs">
            <CardGroup>
              <BCardWrap>
              { props.boss }
              </BCardWrap>
            </CardGroup>
          </div>
        </div>
          <CardGroup>
            {
              props.persons.map((p, i, props) => {
                return (
                  <Card key={p.id} personID={p.id}>
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
