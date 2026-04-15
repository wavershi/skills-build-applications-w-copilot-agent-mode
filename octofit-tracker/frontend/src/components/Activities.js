import React from 'react';
import DataGridPage from './DataGridPage';

const buildEndpoint = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  if (codespace) {
    return `https://${codespace}-8000.app.github.dev/api/activities/`;
  }
  return 'http://localhost:8000/api/activities/';
};

function Activities() {
  return (
    <DataGridPage
      resourceName="Activities"
      endpoint={buildEndpoint()}
      title="Activities"
      emptyMessage="No activities found."
      primaryFieldCandidates={['name', 'title', 'activity_type']}
      secondaryFieldCandidates={['description', 'duration', 'date']}
    />
  );
}

export default Activities;
