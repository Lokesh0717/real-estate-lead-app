import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { subscribeToCollection, updateDocument } from '../firebase/firestore';
import Sidebar from '../components/Sidebar';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [updatingStatus, setUpdatingStatus] = useState(null);

  // Real-time listener for leads
  useEffect(() => {
    setLoading(true);
    setError('');

    // Subscribe to real-time updates, sorted by createdAt descending (newest first)
    const unsubscribe = subscribeToCollection(
      'leads',
      (result) => {
        if (result.success) {
          setLeads(result.data);
          setError('');
        } else {
          setError(result.error || 'Failed to load leads');
        }
        setLoading(false);
      },
      'createdAt',
      'desc'
    );

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  const updateLeadStatus = async (leadId, newStatus) => {
    try {
      setUpdatingStatus(leadId);
      const result = await updateDocument('leads', leadId, { status: newStatus });
      
      if (!result.success) {
        setError(result.error || 'Failed to update status');
        // Clear error after 5 seconds
        setTimeout(() => setError(''), 5000);
      }
      // Real-time listener will automatically update the state
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Failed to update lead status');
      setTimeout(() => setError(''), 5000);
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Filter and search leads
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      // Search filter - handle null/undefined values safely
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === '' || 
        (lead.fullName && lead.fullName.toLowerCase().includes(searchLower)) ||
        (lead.email && lead.email.toLowerCase().includes(searchLower)) ||
        (lead.phone && lead.phone.toLowerCase().includes(searchLower)) ||
        (lead.message && lead.message.toLowerCase().includes(searchLower)) ||
        (lead.company && lead.company.toLowerCase().includes(searchLower));

      // Status filter - default to 'New' if status is missing
      const leadStatus = lead.status || 'New';
      const matchesStatus = statusFilter === 'all' || leadStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, searchQuery, statusFilter]);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    try {
      // Handle Firestore Timestamp
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch (err) {
      console.error('Error formatting date:', err);
      return 'N/A';
    }
  };

  const getStatusBadge = (status) => {
    const statusValue = status || 'New';
    const statusConfig = {
      New: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
      Contacted: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
      Closed: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
    };

    const config = statusConfig[statusValue] || statusConfig.New;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}>
        {statusValue}
      </span>
    );
  };

  // Calculate stats
  const stats = useMemo(() => {
    const total = leads.length;
    const newLeads = leads.filter(l => !l.status || l.status === 'New').length;
    const contacted = leads.filter(l => l.status === 'Contacted').length;
    const closed = leads.filter(l => l.status === 'Closed').length;
    const today = leads.filter((lead) => {
      if (!lead.createdAt) return false;
      const leadDate = lead.createdAt.toDate();
      const today = new Date();
      return (
        leadDate.getDate() === today.getDate() &&
        leadDate.getMonth() === today.getMonth() &&
        leadDate.getFullYear() === today.getFullYear()
      );
    }).length;

    return { total, newLeads, contacted, closed, today };
  }, [leads]);

  return (
    <section className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      {/* Main Content */}
      <section className="flex-1 lg:ml-64">
        {/* Top Header */}
        <header className="glass-card border-b border-white/20 sticky top-0 z-30 backdrop-blur-xl">
          <section className="px-4 sm:px-6 py-4">
            <section className="flex items-center justify-between">
              <section>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Leads Management</h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 tracking-wide">
                  Real-time lead tracking and management
                </p>
              </section>
              {loading && (
                <section className="flex items-center space-x-2 text-primary-600">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className="text-sm font-medium hidden sm:inline">Syncing...</span>
                </section>
              )}
            </section>
          </section>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          {/* Stats Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <article className="glass-card rounded-xl shadow-soft p-6 hover:shadow-glow transition-all duration-300 ease-out hover:scale-[1.02]">
              <section className="flex items-center justify-between">
                <section>
                  <p className="text-sm font-medium text-gray-600 tracking-wide">Total Leads</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2 tracking-tight">{stats.total}</p>
                </section>
                <section className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </section>
              </section>
            </article>

            <article className="glass-card rounded-xl shadow-soft p-6 hover:shadow-glow transition-all duration-300 ease-out hover:scale-[1.02]">
              <section className="flex items-center justify-between">
                <section>
                  <p className="text-sm font-medium text-gray-600 tracking-wide">New</p>
                  <p className="text-3xl font-bold text-blue-600 mt-2 tracking-tight">{stats.newLeads}</p>
                </section>
                <section className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </section>
              </section>
            </article>

            <article className="glass-card rounded-xl shadow-soft p-6 hover:shadow-glow transition-all duration-300 ease-out hover:scale-[1.02]">
              <section className="flex items-center justify-between">
                <section>
                  <p className="text-sm font-medium text-gray-600 tracking-wide">Contacted</p>
                  <p className="text-3xl font-bold text-yellow-600 mt-2 tracking-tight">{stats.contacted}</p>
                </section>
                <section className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </section>
              </section>
            </article>

            <article className="glass-card rounded-xl shadow-soft p-6 hover:shadow-glow transition-all duration-300 ease-out hover:scale-[1.02]">
              <section className="flex items-center justify-between">
                <section>
                  <p className="text-sm font-medium text-gray-600 tracking-wide">Closed</p>
                  <p className="text-3xl font-bold text-green-600 mt-2 tracking-tight">{stats.closed}</p>
                </section>
                <section className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </section>
              </section>
            </article>

            <article className="glass-card rounded-xl shadow-soft p-6 hover:shadow-glow transition-all duration-300 ease-out hover:scale-[1.02]">
              <section className="flex items-center justify-between">
                <section>
                  <p className="text-sm font-medium text-gray-600 tracking-wide">Today</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2 tracking-tight">{stats.today}</p>
                </section>
                <section className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </section>
              </section>
            </article>
          </section>

          {/* Search and Filter Bar */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <section className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <section className="flex-1">
                <section className="relative">
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search leads by name, email, phone, or message..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </section>
              </section>

              {/* Status Filter */}
              <section className="md:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Closed">Closed</option>
                </select>
              </section>
            </section>
          </section>

          {/* Error Message */}
          {error && (
            <section className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg text-red-800">
              <p className="text-sm font-medium">{error}</p>
            </section>
          )}

          {/* Loading State */}
          {loading && leads.length === 0 ? (
            <section className="text-center py-16 glass-card rounded-xl shadow-soft backdrop-blur-xl">
              <svg
                className="animate-spin h-12 w-12 text-primary-600 mx-auto mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="text-gray-600 font-medium">Loading leads...</p>
              <p className="text-sm text-gray-500 mt-2">Connecting to Firestore</p>
            </section>
          ) : filteredLeads.length === 0 ? (
            <section className="text-center py-16 glass-card rounded-xl shadow-soft backdrop-blur-xl">
              <svg
                className="w-20 h-20 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-900 font-semibold text-lg mb-2">No leads found</p>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                {searchQuery || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters to find what you\'re looking for.' 
                  : 'No leads have been submitted yet. New leads will appear here in real-time.'}
              </p>
              {(searchQuery || statusFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                  }}
                  className="mt-4 px-4 py-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear filters
                </button>
              )}
            </section>
          ) : (
            <>
              {/* Desktop Table View */}
              <section className="hidden lg:block glass-card rounded-xl shadow-soft overflow-hidden backdrop-blur-xl">
                <section className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Message
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Created
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <section className="text-sm font-medium text-gray-900">
                              {lead.fullName}
                            </section>
                          </td>
                          <td className="px-6 py-4">
                            <section className="text-sm text-gray-900">{lead.email}</section>
                            <section className="text-sm text-gray-500">{lead.phone}</section>
                          </td>
                          <td className="px-6 py-4">
                            <section className="text-sm text-gray-600 max-w-xs truncate" title={lead.message || 'No message'}>
                              {lead.message || '—'}
                            </section>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(lead.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <section className="text-sm text-gray-500">
                              {formatDate(lead.createdAt)}
                            </section>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={lead.status || 'New'}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                              disabled={updatingStatus === lead.id}
                              className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </section>

              {/* Mobile Card View */}
              <section className="lg:hidden space-y-4">
                {filteredLeads.map((lead) => (
                  <article key={lead.id} className="glass-card rounded-xl shadow-soft p-4 hover:shadow-glow transition-all duration-300 ease-out hover:scale-[1.01] backdrop-blur-xl">
                    <section className="flex items-start justify-between mb-3">
                      <section className="flex-1">
                        <h3 className="text-base font-semibold text-gray-900 mb-1">
                          {lead.fullName}
                        </h3>
                        <section className="flex items-center space-x-2 mb-2">
                          {getStatusBadge(lead.status)}
                        </section>
                      </section>
                      <section className="text-xs text-gray-500">
                        {formatDate(lead.createdAt)}
                      </section>
                    </section>

                    <section className="space-y-2 mb-4">
                      <section className="flex items-center space-x-2 text-sm">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-600">{lead.email || '—'}</span>
                      </section>
                      <section className="flex items-center space-x-2 text-sm">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-gray-600">{lead.phone || '—'}</span>
                      </section>
                      {lead.company && (
                        <section className="flex items-center space-x-2 text-sm">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span className="text-gray-600">{lead.company}</span>
                        </section>
                      )}
                    </section>

                    <section className="mb-4">
                      <p className="text-sm text-gray-600 line-clamp-2">{lead.message || 'No message provided'}</p>
                    </section>

                    <section>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Update Status
                      </label>
                      <select
                        value={lead.status || 'New'}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        disabled={updatingStatus === lead.id}
                        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </section>
                  </article>
                ))}
              </section>
            </>
          )}

          {/* Results Count */}
          {filteredLeads.length > 0 && (
            <section className="mt-4 text-sm text-gray-600">
              Showing {filteredLeads.length} of {leads.length} leads
            </section>
          )}
        </main>
      </section>
    </section>
  );
};

export default AdminDashboard;
