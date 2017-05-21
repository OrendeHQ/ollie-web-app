import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import actionsCreator from '../actions';
import Layout from './Layout.jsx';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionsCreator, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
