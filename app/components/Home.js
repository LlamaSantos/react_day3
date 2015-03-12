'use strict';

import React from 'react';
import firebaseUtils from '../utils/firebaseUtils';
import teamsObj from '../utils/sprite';
import { Link } from 'react-router';

export default React.createClass({

  getInitialState() {
    return {
      teams: []
    };
  },

  componentWillMount() {
    this.setState({
      teams: Object.keys(teamsObj).map((team) => { return {id: team, style: teamsObj[team]} })
    });
  },

  render() {
    var teams = this.state.teams.map((team, index) => {
      return (
        <div className="col-sm-4" key={team.id}>
          <div style={team.style}></div>
          <div className="col-sm-12">
            <div className="text-center">
              <div className="btn-group">
                <Link className="btn btn-secondary" to="schedule" params={{team: team.id}}>Schedule</Link>
                <Link className="btn btn-secondary" to="addgame" params={{team: team.id}}>Add Game</Link>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <span> {teams} </span>
    )
  }
});
