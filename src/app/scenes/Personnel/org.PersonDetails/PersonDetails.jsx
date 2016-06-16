import React, { PropTypes } from 'react';

const PersonDetails = props => {
  return (
    <div>
       <strong>Position Title</strong><br />
        { props.person.PositionTitlePLC }<br />
        <strong>Org Code</strong> <br />
        { props.person.OrgCode }<br />
        <strong>Task Order Technical Monitor</strong> <br />
        { props.person.TO_TechnicalMonitor }<br />
        Date of Hire <br />
        { props.person.DoH }<br />
        Task Order #<br />
        { props.person.TO_Number }<br />
        NASA Contact<br />
        { props.person.NASAContactName }<br />

        Task Order Name<br />
        { props.person.TO_Name }<br />
        NASA Contact Phone # <br />
        { props.person.NASAContactPhone }
    </div>
    );
};

export default PersonDetails;
