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
                      dateCircle="MAR 2016"
                      file={ rf }
                    />
                );
              })
      }
          <div className="row center-xs">
            <div className="col-xs">
              <RaisedButton label={ bLabel }
                backgroundColor="#D8D8D8"
                style={ styles.btnStyle }
                labelStyle={ styles.labelStyle }
              />
           </div>
          </div>
    </section>
  );
};

export default ListGroup;
