import React from 'react';
import DataGridPage from './DataGridPage';

const buildEndpoint = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  if (codespace) {
    return `https://${codespace}-8000.app.github.dev/api/leaderboard/`;
  }
  return 'http://localhost:8000/api/leaderboard/';
};

function Leaderboard() {
  return (
    <DataGridPage
      resourceName="Leaderboard"
      endpoint={buildEndpoint()}
      title="Leaderboard"
      emptyMessage="No leaderboard entries found."
      primaryFieldCandidates={['name', 'user', 'username']}
      secondaryFieldCandidates={['score', 'points', 'rank']}
    />
  );
}

export default Leaderboard;
