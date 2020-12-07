import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Logout = ({ auth: { isAuthenticated, loading }, logout }) => {
  return (
    <ul>
      <li>
        <a onClick={logout} href="/login">
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );
};


Logout.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Logout);
