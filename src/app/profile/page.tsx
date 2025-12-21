'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const router = useRouter();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('/api/users/profile');
                if (res.status === 401) {
                    router.push('/login');
                    return;
                }
                const data = await res.json();
                if (data.success) {
                    setProfile(data.data);
                    setName(data.data.name || '');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [router]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');
        try {
            const res = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });
            const data = await res.json();
            if (data.success) {
                setMessage('Profile updated successfully!');
                setProfile(data.data);
            } else {
                setMessage(data.message || 'Failed to update');
            }
        } catch (error) {
            console.error(error);
            setMessage('Error updating profile');
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
    };

    if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;

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
                                <Link href="/dashboard" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Issues</Link>
                                <Link href="/profile" className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
                            </div>
                        </div>
                        <div>
                            <button onClick={handleLogout} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto bg-gray-900 shadow rounded-lg px-4 py-5 sm:p-6 border border-gray-800">
                    <h2 className="text-lg font-medium leading-6 text-white mb-6">User Profile</h2>

                    {message && (
                        <div className={`mb-4 px-4 py-3 rounded relative ${message.includes('success') ? 'bg-green-900/30 text-green-200 border border-green-500' : 'bg-red-900/30 text-red-200 border border-red-500'}`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400">Email (Read-only)</label>
                            <input
                                type="text"
                                disabled
                                value={profile?.email || ''}
                                className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-500 cursor-not-allowed sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400">User ID</label>
                            <input
                                type="text"
                                disabled
                                value={profile?.id || ''}
                                className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-500 cursor-not-allowed sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
