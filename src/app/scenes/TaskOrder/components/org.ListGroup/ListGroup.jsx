import React, { Component, PropTypes } from 'react';
import ListPanel from '../atm.ListPanel';
import RaisedButton from 'material-ui/RaisedButton';
const styles = {
  contentHeaderMenuLink: {
    textDecoration: 'none',
    color: 'white',
    position: 'absolute',
    top: '20px',
    left: '30px',
    zIndex: '1000'
  },
  btnStyle: {
    margin: 12,
    color: '#fff',
    textTransform: 'initial'
  },
  labelStyle:  {
    textTransform: 'initial'
  }
};
const ListGroup = (props) => {
  const bLabel = `Load more for ${props.orgC}`
  return (
    <section className="listgroup">
       {
              props.reportFiles.map((rf, i) => {
                return (
                  <ListPanel key={ i }
                      monthAbrv={ rf.month }
                      year={ rf.year }
                      file={ rf }
                    />
                );
              })
      }

    </section>
  );
};

export default ListGroup;
