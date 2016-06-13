import { connect } from 'react-redux';
import { setSortParameter } from '../../../actions/sort';
import HomeView from '../HomeView';
import _ from 'lodash';

const getSortedPeople = (people, sortParameterInfo) => {
  const sortParameter = sortParameterInfo[0];
  const ordering = (sortParameterInfo[1]) ? 'desc' : 'asc';
  switch (sortParameter) {
    case 'TITLE':
      return _.orderBy(people, ['title'], [ordering]);
    case 'AUTHOR':
      return _.orderBy(people, ['profile.first_name'], [ordering]);
    case 'WORDS':
      return _.orderBy(people, ['words'], [ordering]);
    case 'NEW':
      return _.orderBy(people, ['publish_at'], [ordering]);
    default:
      return people;
  }
};

const getVisiblePeople = (people, visibilityFilter) => {
  const type = visibilityFilter[0];
  const filter = visibilityFilter[1];
  switch (type) {
    case 'TAG':
      return _.filter(people, (a) => { return _.find(a.tags, ['id', filter]) });
    case 'AUTHOR':
      return _.filter(people, (a) => { return a.profile.id === filter});
    default:
      return people;
  }
};


const mapStateToProps = (state) => {
  const visibleArticles = getVisiblePeople(state.people, state.visibilityFilter);
  return {
    articles: getSortedPeople(visibleArticles, state.sortParameter),
    isFiltered: state.visibilityFilter[0] !== null
  };
};

const SortedPeople = connect(
  mapStateToProps
)(HomeView);

export default SortedPeople;
