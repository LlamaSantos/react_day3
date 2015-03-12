import React from 'react';
import { teamsHash } from '../utils/nbaTeams';

export default React.createClass({
  render() {
    let boxscores = this.props.schedule.map((item) => {
      var style = {
        container : {
          border: "1px solid #333",
          borderRadius:5,
          marginBottom:15,
        }
      };
      return (
        <div className='col-sm-6 text-center' key={item.key}>
          <div className='col-sm-12' style={style.container}>
            <h2>{teamsHash[this.props.homeTeam]}</h2>
            <h5>VS</h5>
            <h3>{item.val.opponent}</h3>
            <h2></h2>
            <h3>
              <span>{item.val.homeScore}</span>
              <span />
              <span>-</span>
              <span/>
              <span>{item.val.awayScore}</span>
            </h3>
          </div>
        </div>
      );
    });

    return (
      <span>
        {boxscores}
      </span>
    );
  }
});
