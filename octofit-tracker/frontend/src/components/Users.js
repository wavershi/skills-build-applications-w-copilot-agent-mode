import React from 'react';
import DataGridPage from './DataGridPage';

const buildEndpoint = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  if (codespace) {
    return `https://${codespace}-8000.app.github.dev/api/users/`;
  }
  return 'http://localhost:8000/api/users/';
};

function Users() {
  return (
    <DataGridPage
      resourceName="Users"
      endpoint={buildEndpoint()}
      title="Users"
      emptyMessage="No users found."
      primaryFieldCandidates={['username', 'name', 'email']}
      secondaryFieldCandidates={['email', 'first_name', 'last_name']}
    />
  );
}

export default Users;
