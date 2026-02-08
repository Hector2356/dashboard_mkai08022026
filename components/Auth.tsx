
import React, { useState } from 'react';
import { supabase } from '../services/supabase';

interface AuthProps {
    onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                onLogin();
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                alert('Check your email for the confirmation link!');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
            <div className="w-full max-w-md p-8 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-xl">
                <h2 className="text-2xl font-bold mb-6 text-center uppercase tracking-widest text-primary">
                    {isLogin ? 'Admin Login' : 'Admin Register'}
                </h2>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-4 text-xs">
                        {error}
                    </div>
                )}

                <form onSubmit={handleAuth} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 bg-black border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-primary transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 bg-black border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-primary transition-colors"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-primary text-white font-bold uppercase tracking-widest rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : (isLogin ? 'Enter Dashboard' : 'Create Account')}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-xs text-zinc-500 hover:text-white underline"
                    >
                        {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
