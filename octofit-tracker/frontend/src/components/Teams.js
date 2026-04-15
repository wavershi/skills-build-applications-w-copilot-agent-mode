import React from 'react';
import DataGridPage from './DataGridPage';

const buildEndpoint = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  if (codespace) {
    return `https://${codespace}-8000.app.github.dev/api/teams/`;
  }
  return 'http://localhost:8000/api/teams/';
};

function Teams() {
  return (
    <DataGridPage
      resourceName="Teams"
      endpoint={buildEndpoint()}
      title="Teams"
      emptyMessage="No teams found."
      primaryFieldCandidates={['name', 'team_name']}
      secondaryFieldCandidates={['description', 'captain', 'coach']}
    />
  );
}

export default Teams;
