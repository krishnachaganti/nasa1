import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import { lightWhite } from 'material-ui/styles/colors';
import MenuIc from 'material-ui/svg-icons/navigation/menu';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'react-bem-grid';
import { Header, Toolbar, Sidebar, Sider, SubToolbar, BossCard } from 'components/index';
import Weather from 'shared/mol.Weather';
import * as sidebarActions from 'state/sidebar/sidebar';
import { getIotd, fetchWeather } from 'state/index';
import Heading from 'shared/atm.Heading';
import Textblock from 'shared/atm.Textblock';

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

const btnStyle = {
  margin: 12,
  color: '#fff'
};
class TaskOrder extends Component {
  static readyOnActions(dispatch) {
    return Promise.all([
      dispatch(fetchWeather())
    ]);
  }

  componentDidMount() {
    TaskOrder.readyOnActions(this.props.dispatch);
  }
  menuButtonClick(ev) {
    ev.preventDefault();
    this.props.dispatch(sidebarActions.toggleSideBar());
  }

  render() {
    return (
      <div>
        <Helmet title="Task Order" />
        <Header menuIcon={
          <MenuIc onTouchTap={ ::this.menuButtonClick } color={ lightWhite } style={ styles.contentHeaderMenuLink } />
          }
          weatherWidget={<Weather temperature={ this.props.hero.temperature } />}
          pageTitle={<Heading size={1} color="#fff" align="center" top="150">
            Task Order Archives
          </Heading>}
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
                  labelColor="#fff"
                  style={ btnStyle }
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
