import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { initEnvironment } from 'state/environment/environment';
import PureRenderMixin from 'react-addons-pure-render-mixin';
function mapStateToProps(state) {
  const { environment } = state;
  const { height, isMobile, width } = environment;
  return {
    height,
    isMobile,
    width
  };
}

@connect(mapStateToProps)
class CoreLayout extends Component {

  constructor() {
    super();
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initEnvironment());
  }

  render() {
    const { height, isMobile, width } = this.props;
    return (
      <div>
        <Helmet
          title="Splat"
          titleTemplate="Splat - %s"
          meta={[
            { 'char-set': 'utf-8' },
            { name: 'description', content: 'Splat' }
          ]}
        />
        <div>
          { this.props.children }
        </div>
      </div>
    )
  }
}

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired,
  dispatch: PropTypes.func,
  height: PropTypes.number,
  isMobile: PropTypes.bool,
  width: PropTypes.number
};

export default CoreLayout;
