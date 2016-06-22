import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import { lightWhite } from 'material-ui/styles/colors';
import MenuIc from 'material-ui/svg-icons/navigation/menu';
import RaisedButton from 'material-ui/RaisedButton';
import { Header, Toolbar, Sidebar, Sider, SubToolbar } from 'components/index';
import Weather from 'shared/mol.Weather';
import * as sidebarActions from 'state/sidebar/sidebar';
import { getIotd, fetchWeather } from 'state/index';
import Heading from 'shared/atm.Heading';
import Textblock from 'shared/atm.Textblock';
import ButtonGroup from './org.ButtonGroup';
import fallbackimg from '../Personnel/org.Hero/fallback-hero.jpg';
import Hero from '../Personnel/org.Hero';
const labelSty = {
  color: '#fff',
  textTransform: 'initial'
};
const btnStyle = {
  margin: 12,
  color: '#fff'
};
class TaskOrder extends Component {
  static readyOnActions(dispatch) {
    return Promise.all([
      dispatch(fetchWeather()),
      dispatch(getIotd())
    ]);
  }

  componentDidMount() {
    TaskOrder.readyOnActions(this.props.dispatch);
  }
  menuButtonClick(ev, dispatch) {
    ev.preventDefault();
    this.props.dispatch(sidebarActions.toggleSideBar());
  }

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
      }
    };
    return (
      <div>
        <Helmet title="Task Order" />
        <Header heroImage={ styles.heroStyle } menuIcon={
          <MenuIc onTouchTap={ ::this.menuButtonClick } color={ lightWhite } style={ styles.contentHeaderMenuLink } />
          }
          weatherWidget={ <Weather temperature={ this.props.hero.temperature } /> }
          pageTitle={
            <Heading size={1} color="#fff" align="center" top="75">
              Task Order Archives
            </Heading>
          }
          buttonGroup={ <ButtonGroup /> }
        />
        <Sider />
        <Sidebar />
        <div className="wrap">
          <div className="col-xs-12">
          <Textblock center>
            Bacon ipsum dolor amet kevin andouille short ribs boudin ribeye. Meatloaf biltong rump t-bone
            alcatra bresaola short ribs shoulder flank salami pork chop shankle. Tri-tip ham hock doner corned
            beef jerky shank. Flank capicola landjaeger tenderloin kevin cow corned beef chicken sirloin short
            ribs shank ham beef. Landjaeger ball tip pork chop pork belly meatball pastrami venison. Capicola sausage
            hamburger, brisket pork chop prosciutto leberkas swine picanha shank tri-tip cow pork.
          </Textblock>
          <div className="row center-xs">
            <div className="col-xs-6">
                <RaisedButton label="Submit a Task Order"
                  backgroundColor="#043A92"
                  style={ btnStyle }
                  labelStyle={ labelSty }
                />
            </div>
          </div>
          </div>
          { this.props.children }
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    hero: state.heroReducer,
    loading: state.heroReducer.loading,
    people: state.peopleReducer,
    sidebar: state.sidebarReducer
  };
}

export default connect(mapStateToProps)(TaskOrder);
