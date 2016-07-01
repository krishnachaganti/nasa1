import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IconButton from 'material-ui/IconButton';
import { lightWhite } from 'material-ui/styles/colors';
import MenuIc from 'material-ui/svg-icons/navigation/menu';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Sider from 'shared/atm.Sider';
import Sidebar from 'shared/org.Sidebar';
import Toolbar from 'shared/mol.Toolbar';
import Weather from 'shared/mol.Weather';
import Heading from 'shared/atm.Heading';
import SubToolbar from 'shared/atm.SubToolbar';
import Textblock from 'shared/atm.Textblock';
import fallbackimg from '../Personnel/components/org.Hero/fallback-hero.jpg';
import * as sidebarActions from 'state/sidebar/sidebar';
import { getIotd, fetchWeather } from 'state/index';
import { fetchReports, setFilter } from './state/report';
import { TaskOrderListing, Header, ButtonGroup } from 'scenes/TaskOrder/components';

const labelSty = {
  color: '#fff',
  textTransform: 'initial'
};
const btnStyle = {
  margin: 12,
  color: '#fff'
};


function mapStateToProps(state) {
  return {
    filter: state.report.filter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ setFilter }, dispatch)
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class TaskOrder extends Component {
  static readyOnActions(dispatch) {
    return Promise.all([
      dispatch(fetchWeather()),
      dispatch(getIotd()),
      dispatch(fetchReports())
    ]);
  }
  constructor(props) {
    super(props);
    this.state = {open: false};
  }
  componentDidMount() {
    TaskOrder.readyOnActions(this.props.dispatch);
  }

  handleFilter = (event, index, value) => {
    this.props.actions.setFilter(value);
  }
  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({ open: false });
  render() {
    const HERO_IMG = this.props.hero.iotd || fallbackimg;
    const styles = {
      contentHeaderMenuLink: {
        textDecoration: 'none',
        color: 'white',
        position: 'absolute',
        top: '20px',
        left: '30px',
        zIndex: '1000'
      },
      heroStyle: {
        height: '465px',
        width: '100%',
        backgroundImage: 'url(' + HERO_IMG + ')', // eslint-disable-line
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
      },
      search: {
        width: '600px',
        height: '60px'
      },
      drawer: {
        backgroundColor: '#11222D',
        paddingTop: '80px'
      }
    };
    return (
      <div>
        <Helmet title="Task Order" />
        <Header heroImage={ styles.heroStyle } menuIcon={
          <MenuIc onTouchTap={ ::this.handleToggle } color="#fff" style={ styles.contentHeaderMenuLink } />
          }
          weatherWidget={ <Weather temperature={ this.props.hero.temperature } /> }
          pageTitle={
            <Heading size={1} color="#fff" align="center" top="175">
              Task Order Archives
            </Heading>
          }
        />
        <Drawer
          docked={false}
          width={200}
          open={ this.state.open }
          onRequestChange={(open) => this.setState({open})}
          containerStyle={ styles.drawer }
        >
          <MenuItem className="nav__item"><Link to="/">Employee Search</Link></MenuItem>
          <MenuItem className="nav__item"><Link to="/">Financial Report</Link></MenuItem>
          <MenuItem className="nav__item"><Link to="/taskorder">Task Order Archives</Link></MenuItem>
        </Drawer>
        <Sider />
        <div className="wrap">
          <div className="col-xs-12">
          <Textblock center>
            Submitting a new task order is easy.
          </Textblock>
          <div className="row center-xs">
            <div className="col-xs-6">
            <a href="mailto:status@nasaupdate.com">
                <RaisedButton label="Submit a Task Order"
                  backgroundColor="#043A92"
                  style={ btnStyle }
                  labelStyle={ labelSty }
                /></a>
            </div>
          </div>
          </div>
          <TaskOrderListing env={ this.props.env } reports={ this.props.report } loading={ this.props.loading } />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    hero: state.heroReducer,
    loading: state.report.loading,
    report: state.report,
    sidebar: state.sidebarReducer,
    env: state.environment
  };
}

export default connect(mapStateToProps)(TaskOrder);
