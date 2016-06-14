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
import MenuIc from 'material-ui/svg-icons/navigation/menu';
import { getIotd, fetchWeather } from '../../actions/header';
import { getPeople } from '../../actions/people';
import SearchInput, { createFilter } from 'react-search-input';
import * as sidebarActions from '../../actions/sidebar';
import Loader from '../../components/Loader';
import { increment, decrement } from '../../actions/kudos';
import PersonCard from '../../components/PersonCard';
import SubToolbar from '../../components/SubToolbar';
import Counter from '../../components/Counter';
import OrgGroup from '../../scenes/OrgGroup';
import BossCard from '../../components/BossCard';
import '../../styles/core.scss';

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
const KEYS_TO_FILTERS = ['OrgCode'];
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
    this.state = {
      searchTerm: 'IT-A'
    };
  }

  componentDidMount(dispatch) {
    this.constructor.loadAsyncData(this.props.dispatch);
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }
  onSetOpen(open) {
    this.setState({ open });
  }
  menuButtonClick(ev) {
    ev.preventDefault();
    this.props.dispatch(sidebarActions.toggleSideBar());
  }
  handleIncrement = () => {
    const { dispatch, count } = this.props;
    dispatch(increment(count));
  }

  handleDecrement = () => {
    const { dispatch, count } = this.props;
    dispatch(decrement(count));
  }

  render() {
    const headerStyle = {
      height: '465px',
      width: '100%',
      backgroundImage: 'url(' + this.props.header.iotd + ')',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed'
    };
    const search = {
      width: '600px',
      height: '60px'
    };
    const filteredPeople = this.props.people.people.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    return (
      <div className="row">
          <MenuIc onTouchTap={ this.menuButtonClick } color={ lightWhite } style={ styles.contentHeaderMenuLink } />
            <Header headerImage={ headerStyle }
            imageTitle={ this.props.header.title }
            temperature={ this.props.header.temperature }
            people={ this.props.people.people }
            searchInput={<SearchInput style={ search } className="search-input" onChange={::this.searchUpdated} /> }
          />
          <Sidebar />
          <Toolbar total={ this.props.people.people } />
          <Sider />
            <div className="wrap">


          <OrgGroup boss={
              <BossCard nasaName="Lisa Barber" position="Boss" orgCode="IT-A" />
          } toolbar={ <SubToolbar orgCode="IT-A:" orgTitle="Business Office" /> } orgType="a" />
          <OrgGroup boss={
              <BossCard nasaName="Henry Yu" position="Boss" orgCode="IT-B" />
            } toolbar={ <SubToolbar orgCode="IT-B:" orgTitle="IT Security Office" /> } orgType="b" />
          <OrgGroup boss={
              <BossCard nasaName="Henry Yu" position="Boss" orgCode="IT-C" />
            } toolbar={ <SubToolbar orgCode="IT-C:" orgTitle="IT Security Office" /> } orgType="c" />
          <OrgGroup boss={
              <BossCard nasaName="Henry Yu" position="Boss" orgCode="IT-D" />
            } toolbar={ <SubToolbar orgCode="IT-D:" orgTitle="IT Security Office" /> } orgType="d" />
          </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    header: state.header,
    loading: state.header.loading,
    people: state.people,
    sidebar: state.sidebar,
    kudos: state.kudos
  };
};

CoreLayout.propTypes = {
  children: React.PropTypes.element,
  dispatch: React.PropTypes.func,
  header: React.PropTypes.object
};

export default connect(mapStateToProps, null)(CoreLayout);
