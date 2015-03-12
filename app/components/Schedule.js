'use strict';

import React from 'react';
import Router from 'react-router';
import firebaseUtils from '../utils/firebaseUtils';
import teamsObj from '../utils/sprite';
import GameBox  from './GameBox';
import { teamsHash } from '../utils/nbaTeams';

export default React.createClass({
  mixins: [Router.State],
  getInitialState() {
    return {
      wins: 0,
      losses: 0,
      id: '',
      name: this.getParams().team,
      schedule: []
    }
  },

  componentWillMount() {
    this.ref = firebaseUtils.getRef();
    this.ref.on('value', (snapshot) => {
      var team = snapshot.val()[this.getParams().team];
      this.setState({
        wins: team.info.wins || 0,
        losses: team.info.losses || 0,
        id: '',
        name: this.getParams().team,
        schedule: firebaseUtils.toArray(team.schedule),
      });
    });
  },

  componentDidUnmount() {
    this.ref.off('value');
  },

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="text-center">
            <h2> {teamsHash[this.state.name]} Schedule </h2>
            <div style={teamsObj[this.getParams().team]}></div>
            <h2> Wins: {this.state.wins} Losses: {this.state.losses} </h2>
            <GameBox homeTeam={this.state.name} schedule={this.state.schedule} />
          </div>
        </div>
      </div>
    )
  }
});
