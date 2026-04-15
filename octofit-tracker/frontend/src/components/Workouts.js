import React from 'react';
import DataGridPage from './DataGridPage';

const buildEndpoint = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  if (codespace) {
    return `https://${codespace}-8000.app.github.dev/api/workouts/`;
  }
  return 'http://localhost:8000/api/workouts/';
};

function Workouts() {
  return (
    <DataGridPage
      resourceName="Workouts"
      endpoint={buildEndpoint()}
      title="Workouts"
      emptyMessage="No workouts found."
      primaryFieldCandidates={['name', 'workout_name', 'title']}
      secondaryFieldCandidates={['duration', 'difficulty', 'target_muscle']}
    />
  );
}

export default Workouts;
