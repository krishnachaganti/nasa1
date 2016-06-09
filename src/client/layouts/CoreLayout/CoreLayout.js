import React, { Component, PropTypes } from 'react';
import Header from '../../components/Header';
import Toolbar from '../../components/Toolbar';
import Sider from '../../components/Sider';
import IconButton from 'material-ui/IconButton';
import { connect } from 'react-redux';
import { lightWhite } from 'material-ui/styles/colors';
import Sidebar from '../../components/Sidebar/Sidebar';
import Weather from '../../components/Weather';
import classes from './CoreLayout.scss';
import '../../styles/core.scss';
import MenuIc from 'material-ui/svg-icons/navigation/menu';
import { getIotd, fetchWeather } from '../../actions/header';
import { getPeople } from '../../actions/people';
import * as sidebarActions from '../../actions/sidebar';
import Loader from '../../components/Loader';
const styles = {
  contentHeaderMenuLink: {
    textDecoration: 'none',
    color: 'white',
    position: 'absolute',
    top: '20px',
    left: '30px',
    zIndex: '1000'
  }
};

class CoreLayout extends Component {
  static loadAsyncData(dispatch) {
    dispatch(getIotd());
    dispatch(fetchWeather());
    dispatch(getPeople());
  }
  constructor(props) {
    super(props);

    this.menuButtonClick = this.menuButtonClick.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
  }

  componentDidMount(dispatch) {
    this.constructor.loadAsyncData(this.props.dispatch);
  }
  onSetOpen(open) {
    this.setState({ open });
  }
  menuButtonClick(ev) {
    ev.preventDefault();
    this.props.dispatch(sidebarActions.toggleSideBar());
  }

  render() {
    const headerStyle = {
      height: '465px',
      width: '100%',
      backgroundImage: 'url(' + this.props.header.iotd + ')',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed'
    };

    return (
      <div className="row">
          <MenuIc onTouchTap={ this.menuButtonClick } color={ lightWhite } style={ styles.contentHeaderMenuLink } />
          { this.props.header.loading ? <Loader /> :
            <Header headerImage={ headerStyle }
            imageTitle={ this.props.header.title }
            temperature={ this.props.header.temperature }
          />
        }
          <Sidebar />
          <Toolbar />
          <Sider />
          { this.props.children }

      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    header: state.header,
    loading: state.header.loading,
    people: state.people,
    sidebar: state.sidebar
  };
};

CoreLayout.propTypes = {
  children: React.PropTypes.element,
  dispatch: React.PropTypes.func,
  header: React.PropTypes.object
};
export default connect(mapStateToProps, null)(CoreLayout);
