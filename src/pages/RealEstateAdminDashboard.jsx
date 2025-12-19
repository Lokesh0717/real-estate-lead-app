import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { updateDocument, subscribeToCollection } from '../firebase/firestore';
import RealEstateSidebar from '../components/RealEstateSidebar';

const RealEstateAdminDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('all');
  const [updatingStatus, setUpdatingStatus] = useState(null);

  useEffect(() => {
    if (authLoading) return;

    // Set initial loading state
    setLoading(true);
    setError('');

    // Add timeout to prevent indefinite loading
    const timeoutId = setTimeout(() => {
      setError('Loading is taking longer than expected. Please check your connection or Firebase configuration.');
      setLoading(false);
    }, 15000); // 15 second timeout

    // Subscribe to real-time updates from Firestore
    console.log('🔌 Connecting to Firestore...');
    const unsubscribe = subscribeToCollection(
      'leads',
      (result) => {
        clearTimeout(timeoutId);
        if (result.success) {
          console.log('✅ Leads loaded:', result.data.length);
          // Data is already sorted by subscribeToCollection, but ensure proper sorting
          const sortedLeads = result.data.sort((a, b) => {
            const aTime = a.createdAt?.toMillis?.() || a.createdAt?.seconds * 1000 || 0;
            const bTime = b.createdAt?.toMillis?.() || b.createdAt?.seconds * 1000 || 0;
            return bTime - aTime;
          });
          setLeads(sortedLeads);
          setLoading(false);
          setError('');
        } else {
          console.error('❌ Error loading leads:', result.error);
          let errorMsg = result.error || 'Failed to load leads.';
          if (result.error?.includes('permission') || result.error?.includes('Permission')) {
            errorMsg = 'Permission denied. Please update Firestore security rules. See QUICK_FIX_FIRESTORE_RULES.md';
          }
          setError(errorMsg);
          setLoading(false);
        }
      },
      'createdAt',
      'desc'
    );

    return () => {
      clearTimeout(timeoutId);
      unsubscribe();
    };
  }, [user, authLoading, navigate]);

  const updateLeadStatus = async (leadId, newStatus) => {
    try {
      setUpdatingStatus(leadId);
      const result = await updateDocument('leads', leadId, { status: newStatus });

      if (!result.success) {
        throw new Error(result.error || 'Failed to update lead status');
      }
    } catch (error) {
      console.error('Error updating lead status:', error);
      setError('Failed to update lead status. Please try again.');
      setTimeout(() => setError(''), 5000);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    try {
      let date;
      if (timestamp.toDate) {
        date = timestamp.toDate();
      } else if (timestamp.seconds) {
        date = new Date(timestamp.seconds * 1000);
      } else {
        date = new Date(timestamp);
      }
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'N/A';
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      New: 'bg-blue-100 text-blue-800 border-blue-200',
      Contacted: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Site Visit': 'bg-purple-100 text-purple-800 border-purple-200',
      Closed: 'bg-green-100 text-green-800 border-green-200',
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold border ${
          statusColors[status] || 'bg-gray-100 text-gray-800 border-gray-200'
        }`}
      >
        {status || 'New'}
      </span>
    );
  };

  const getPropertyTypeBadge = (type) => {
    const typeColors = {
      buy: 'bg-green-100 text-green-800 border-green-200',
      sell: 'bg-purple-100 text-purple-800 border-purple-200',
      rent: 'bg-orange-100 text-orange-800 border-orange-200',
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize border ${
          typeColors[type] || 'bg-gray-100 text-gray-800 border-gray-200'
        }`}
      >
        {type || 'N/A'}
      </span>
    );
  };

  const formatBudget = (budget) => {
    if (!budget) return 'N/A';
    const budgetMap = {
      'under-50lakhs': 'Under ₹50 Lakhs',
      '50lakhs-1cr': '₹50 Lakhs - ₹1 Cr',
      '1cr-2cr': '₹1 Cr - ₹2 Cr',
      '2cr-5cr': '₹2 Cr - ₹5 Cr',
      '5cr-10cr': '₹5 Cr - ₹10 Cr',
      'above-10cr': 'Above ₹10 Cr',
    };
    return budgetMap[budget] || budget;
  };

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      !searchQuery ||
      lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone?.includes(searchQuery);

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesPropertyType =
      propertyTypeFilter === 'all' || lead.propertyType === propertyTypeFilter;

    return matchesSearch && matchesStatus && matchesPropertyType;
  });

  // Calculate stats
  const stats = {
    total: leads.length,
    newLeads: leads.filter((l) => l.status === 'New' || !l.status).length,
    contacted: leads.filter((l) => l.status === 'Contacted').length,
    siteVisit: leads.filter((l) => l.status === 'Site Visit').length,
    closed: leads.filter((l) => l.status === 'Closed').length,
  };

  // Show loading only for auth, not for data (show skeleton instead)
  if (authLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50">
        <section className="text-center">
          <svg
            className="animate-spin h-12 w-12 text-amber-600 mx-auto mb-4"
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
          <p className="text-gray-600">Verifying authentication...</p>
        </section>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 flex">
      <RealEstateSidebar />

      {/* Main Content */}
      <section className="flex-1 lg:ml-64">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
          <section className="px-4 sm:px-6 lg:px-8 py-4">
            <section className="flex items-center justify-between">
              <section>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  Leads Management
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-snug">
                  Manage and track your real estate leads
                </p>
              </section>
              {loading && (
                <section className="flex items-center space-x-2 text-amber-600">
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

        <main className="p-4 sm:p-6 lg:p-8">
          {/* Loading State for Data */}
          {loading && leads.length === 0 ? (
            <section className="space-y-6">
              {/* Stats Cards Skeleton */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <article key={i} className="glass-card rounded-xl shadow-soft p-6 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
                    <div className="h-8 bg-gray-300 rounded w-16"></div>
                  </article>
                ))}
              </section>
              {/* Table Skeleton */}
              <section className="glass-card rounded-xl shadow-soft p-6">
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex space-x-4 animate-pulse">
                      <div className="h-4 bg-gray-200 rounded flex-1"></div>
                      <div className="h-4 bg-gray-200 rounded flex-1"></div>
                      <div className="h-4 bg-gray-200 rounded flex-1"></div>
                      <div className="h-4 bg-gray-200 rounded flex-1"></div>
                    </div>
                  ))}
                </div>
              </section>
              <section className="text-center py-8">
                <svg
                  className="animate-spin h-8 w-8 text-amber-600 mx-auto mb-2"
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
                <p className="text-sm text-gray-600">Loading leads...</p>
              </section>
            </section>
          ) : (
            <>
          {/* Stats Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <article className="glass-card rounded-xl shadow-soft p-6 hover:shadow-glow transition-all duration-300 ease-out hover:scale-[1.02]">
              <p className="text-sm font-medium text-gray-600 tracking-wide">Total Leads</p>
              <p className="text-3xl font-bold text-gray-900 mt-2 tracking-tight">{stats.total}</p>
            </article>
            <article className="glass-card rounded-xl shadow-soft p-6 hover:shadow-glow transition-all duration-300 ease-out hover:scale-[1.02]">
              <p className="text-sm font-medium text-gray-600 tracking-wide">New</p>
              <p className="text-3xl font-bold text-blue-600 mt-2 tracking-tight">
                {stats.newLeads}
              </p>
            </article>
            <article className="glass-card rounded-xl shadow-soft p-6 hover:shadow-glow transition-all duration-300 ease-out hover:scale-[1.02]">
              <p className="text-sm font-medium text-gray-600 tracking-wide">Contacted</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2 tracking-tight">
                {stats.contacted}
              </p>
            </article>
            <article className="glass-card rounded-xl shadow-soft p-6 hover:shadow-glow transition-all duration-300 ease-out hover:scale-[1.02]">
              <p className="text-sm font-medium text-gray-600 tracking-wide">Site Visit</p>
              <p className="text-3xl font-bold text-purple-600 mt-2 tracking-tight">
                {stats.siteVisit}
              </p>
            </article>
            <article className="glass-card rounded-xl shadow-soft p-6 hover:shadow-glow transition-all duration-300 ease-out hover:scale-[1.02]">
              <p className="text-sm font-medium text-gray-600 tracking-wide">Closed</p>
              <p className="text-3xl font-bold text-green-600 mt-2 tracking-tight">
                {stats.closed}
              </p>
            </article>
          </section>

          {/* Filters */}
          <section className="glass-card rounded-xl shadow-soft p-4 mb-6 border border-gray-100">
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <section>
                <label className="block text-xs font-semibold text-gray-700 mb-2 tracking-wide">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white"
                />
              </section>
              <section>
                <label className="block text-xs font-semibold text-gray-700 mb-2 tracking-wide">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Site Visit">Site Visit</option>
                  <option value="Closed">Closed</option>
                </select>
              </section>
              <section>
                <label className="block text-xs font-semibold text-gray-700 mb-2 tracking-wide">
                  Property Type
                </label>
                <select
                  value={propertyTypeFilter}
                  onChange={(e) => setPropertyTypeFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                >
                  <option value="all">All Types</option>
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                  <option value="rent">Rent</option>
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

          {/* Leads Table */}
          {filteredLeads.length === 0 ? (
            <section className="text-center py-16 glass-card rounded-xl shadow-soft border border-gray-100">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-gray-600 font-medium">No leads found</p>
              <p className="text-sm text-gray-500 mt-1">
                {searchQuery || statusFilter !== 'all' || propertyTypeFilter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'No leads have been submitted yet'}
              </p>
            </section>
          ) : (
            <section className="glass-card rounded-xl shadow-soft overflow-hidden border border-gray-100">
              <section className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Property Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Budget
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm font-semibold text-gray-900">{lead.name || 'N/A'}</p>
                          <p className="text-xs text-gray-500 mt-1">{lead.email || ''}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm text-gray-900">{lead.phone || 'N/A'}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getPropertyTypeBadge(lead.propertyType)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm text-gray-900">{formatBudget(lead.budget)}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(lead.status)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(lead.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <select
                            value={lead.status || 'New'}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                            disabled={updatingStatus === lead.id}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-amber-400 transition-colors"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Site Visit">Site Visit</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </section>
          )}
            </>
          )}
        </main>
      </section>
    </section>
  );
};

export default RealEstateAdminDashboard;
