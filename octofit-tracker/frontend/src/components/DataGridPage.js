import React, { useEffect, useMemo, useState } from 'react';

function DataGridPage({
  resourceName,
  endpoint,
  title,
  emptyMessage,
  primaryFieldCandidates,
  secondaryFieldCandidates,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    console.log(`[${resourceName}] Fetch endpoint:`, endpoint);

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(`[${resourceName}] Fetched data:`, data);
        const normalized = Array.isArray(data) ? data : data?.results || [];
        setItems(normalized);
      })
      .catch((fetchError) => {
        console.error(`[${resourceName}] Fetch failed:`, fetchError);
        setError(fetchError.message || `Failed to load ${resourceName.toLowerCase()}`);
      })
      .finally(() => setLoading(false));
  }, [endpoint, resourceName]);

  const filteredItems = useMemo(() => {
    if (!search) {
      return items;
    }

    const lower = search.toLowerCase();
    return items.filter((item) => JSON.stringify(item).toLowerCase().includes(lower));
  }, [items, search]);

  const pickField = (item, fields) => {
    const matched = fields.find((field) => item?.[field] !== undefined && item?.[field] !== null && item?.[field] !== '');
    if (!matched) {
      return '-';
    }
    const value = item[matched];
    return typeof value === 'object' ? JSON.stringify(value) : String(value);
  };

  return (
    <section className="pb-4">
      <div className="card page-card">
        <div className="card-body">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
            <div>
              <h2 className="h3 page-title">{title}</h2>
              <p className="text-muted mb-0">Live records from Django REST Framework.</p>
            </div>
            <a className="btn btn-outline-primary" href={endpoint} target="_blank" rel="noreferrer">
              Open API Endpoint
            </a>
          </div>

          <form className="row g-2 align-items-end mb-3" onSubmit={(event) => event.preventDefault()}>
            <div className="col-sm-8 col-md-6">
              <label htmlFor={`${resourceName.toLowerCase()}-search`} className="form-label fw-semibold">
                Search {title}
              </label>
              <input
                id={`${resourceName.toLowerCase()}-search`}
                className="form-control"
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={`Filter ${title.toLowerCase()}...`}
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-secondary" type="button" onClick={() => setSearch('')}>
                Clear
              </button>
            </div>
          </form>

          {loading && <div className="alert alert-info">Loading {title.toLowerCase()}...</div>}
          {error && <div className="alert alert-danger">Error: {error}</div>}

          {!loading && !error && (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Primary</th>
                    <th scope="col">Secondary</th>
                    <th scope="col" className="text-end">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center text-muted py-4">
                        {emptyMessage}
                      </td>
                    </tr>
                  )}
                  {filteredItems.map((item, index) => (
                    <tr key={item.id || item._id || index}>
                      <th scope="row">{index + 1}</th>
                      <td>{pickField(item, primaryFieldCandidates)}</td>
                      <td>{pickField(item, secondaryFieldCandidates)}</td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-primary" type="button" onClick={() => setSelectedItem(item)}>
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedItem && (
        <>
          <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title h5 mb-0">{title} Record</h3>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setSelectedItem(null)}
                  />
                </div>
                <div className="modal-body">
                  <pre className="bg-light p-3 rounded mb-0" style={{ maxHeight: '360px' }}>
                    {JSON.stringify(selectedItem, null, 2)}
                  </pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedItem(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop-soft" />
        </>
      )}
    </section>
  );
}

export default DataGridPage;
