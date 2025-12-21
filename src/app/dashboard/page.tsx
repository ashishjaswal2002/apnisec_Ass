'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Issue {
    id: string;
    type: string;
    title: string;
    description: string;
    priority: string;
    status: string;
    createdAt: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [editingIssue, setEditingIssue] = useState<Issue | null>(null);

    // Form State
    const [newIssue, setNewIssue] = useState({
        type: 'Cloud Security',
        title: '',
        description: '',
        priority: 'Medium'
    });

    const fetchIssues = async () => {
        try {
            const url = filter ? `/api/issues?type=${encodeURIComponent(filter)}` : '/api/issues';
            const res = await fetch(url);
            if (res.status === 401) {
                router.push('/login');
                return;
            }
            const data = await res.json();
            if (data.success) {
                setIssues(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch issues', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIssues();
    }, [filter, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = editingIssue ? `/api/issues/${editingIssue.id}` : '/api/issues';
            const method = editingIssue ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newIssue),
            });
            const data = await res.json();
            if (data.success) {
                setIsCreating(false);
                setEditingIssue(null);
                setNewIssue({ type: 'Cloud Security', title: '', description: '', priority: 'Medium' });
                fetchIssues();
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Failed to save issue', error);
        }
    };

    const handleEdit = (issue: Issue) => {
        setEditingIssue(issue);
        setNewIssue({
            type: issue.type,
            title: issue.title,
            description: issue.description,
            priority: issue.priority || 'Medium'
        });
        setIsCreating(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this issue?')) return;
        try {
            const res = await fetch(`/api/issues/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setIssues(issues.filter(i => i.id !== id));
            } else {
                alert('Failed to delete issue');
            }
        } catch (error) {
            console.error('Failed to delete issue', error);
        }
    };

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/issues/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) {
                setIssues(issues.map(i => i.id === id ? { ...i, status: newStatus } : i));
            }
        } catch (error) {
            console.error('Failed to update status', error);
        }
    };

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
    };

    const filteredIssues = issues.filter(issue =>
        issue.title.toLowerCase().includes(search.toLowerCase()) ||
        issue.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-black text-gray-100">
            <nav className="bg-gray-900 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                ApniSec Dashboard
                            </Link>
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link href="/dashboard" className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium">Issues</Link>
                                <Link href="/profile" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
                            </div>
                        </div>
                        <div>
                            <button onClick={handleLogout} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <h1 className="text-2xl font-semibold text-white">Issue Management</h1>
                        <button
                            onClick={() => {
                                setIsCreating(!isCreating);
                                setEditingIssue(null);
                                setNewIssue({ type: 'Cloud Security', title: '', description: '', priority: 'Medium' });
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors w-full md:w-auto"
                        >
                            {isCreating ? 'Cancel' : 'Create New Issue'}
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search issues..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="md:w-64">
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            >
                                <option value="">All Types</option>
                                <option value="Cloud Security">Cloud Security</option>
                                <option value="VAPT">VAPT</option>
                                <option value="Reteam Assessment">Reteam Assessment</option>
                            </select>
                        </div>
                    </div>

                    {isCreating && (
                        <div className="bg-gray-900 shadow rounded-lg p-6 mb-8 border border-gray-800 animate-fade-in-down">
                            <h3 className="text-lg font-medium leading-6 text-white mb-4">
                                {editingIssue ? 'Edit Issue' : 'New Issue'}
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400">Title</label>
                                        <input
                                            type="text"
                                            required
                                            value={newIssue.title}
                                            onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
                                            className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400">Type</label>
                                        <select
                                            value={newIssue.type}
                                            onChange={(e) => setNewIssue({ ...newIssue, type: e.target.value })}
                                            className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        >
                                            <option value="Cloud Security">Cloud Security</option>
                                            <option value="VAPT">VAPT</option>
                                            <option value="Reteam Assessment">Reteam Assessment</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Description</label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={newIssue.description}
                                        onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
                                        className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                    >
                                        {editingIssue ? 'Update Issue' : 'Submit Issue'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredIssues.map((issue) => (
                                <div key={issue.id} className="bg-gray-900 overflow-hidden shadow rounded-lg border border-gray-800 hover:border-blue-500/30 transition-all flex flex-col">
                                    <div className="px-4 py-5 sm:p-6 flex-grow">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${issue.type === 'Cloud Security' ? 'bg-blue-900 text-blue-200' :
                                                issue.type === 'VAPT' ? 'bg-purple-900 text-purple-200' :
                                                    'bg-green-900 text-green-200'
                                                }`}>
                                                {issue.type}
                                            </span>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleEdit(issue)}
                                                    className="text-gray-500 hover:text-blue-500 transition-colors"
                                                    title="Edit Issue"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(issue.id)}
                                                    className="text-gray-500 hover:text-red-500 transition-colors"
                                                    title="Delete Issue"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                        <h3 className="mt-2 text-lg font-medium text-white truncate" title={issue.title}>
                                            {issue.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-400 line-clamp-3 mb-4">
                                            {issue.description}
                                        </p>

                                        <div className="border-t border-gray-800 pt-4 mt-auto">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500">{new Date(issue.createdAt).toLocaleDateString()}</span>
                                                <select
                                                    value={issue.status || 'Open'}
                                                    onChange={(e) => handleStatusUpdate(issue.id, e.target.value)}
                                                    className="bg-gray-800 text-xs text-white border border-gray-700 rounded px-2 py-1 focus:outline-none"
                                                >
                                                    <option value="Open">Open</option>
                                                    <option value="In Progress">In Progress</option>
                                                    <option value="Closed">Closed</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {filteredIssues.length === 0 && (
                                <div className="col-span-full text-center text-gray-500 py-12">
                                    No issues found matching your criteria.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
