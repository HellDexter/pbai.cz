
import React, { useState } from 'react';
import { Lock, User, ArrowRight, ScanEye, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface Props {
  onLoginSuccess: () => void;
}

const LoginScreen: React.FC<Props> = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (authError) throw authError;

      // When signInWithPassword succeeds, the onAuthStateChange in App.tsx 
      // will trigger and handle the transition to Dashboard.
      // We don't need to do anything else here.
      
    } catch (err: any) {
      console.error("Login component error:", err);
      setError(err.message === "Invalid login credentials" 
        ? "Neplatný e-mail nebo heslo." 
        : "Chyba přihlášení. Zkontrolujte spojení se serverem.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative z-20 px-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md animate-fade-in-up">
        <div className="relative bg-[#050505]/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/5 border border-white/10 mb-6 shadow-[0_0_40px_rgba(6,182,212,0.1)]">
              <ScanEye className={`w-10 h-10 ${loading ? 'text-white animate-pulse' : 'text-cyan-400'}`} />
            </div>
            <h1 className="text-3xl font-display text-white mb-2 tracking-wide uppercase">Vstup do systému</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-mono">Identity Verification Required</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 group">
              <label className="text-[10px] text-gray-500 font-mono ml-1 uppercase">E-mailová adresa</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-gray-600 group-focus-within:text-cyan-400 transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-4 bg-white/[0.03] border border-white/10 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-500/50 transition-all text-sm"
                  placeholder="student@skola.cz"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] text-gray-500 font-mono ml-1 uppercase">Heslo</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-600 group-focus-within:text-cyan-400 transition-colors" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-4 bg-white/[0.03] border border-white/10 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-500/50 transition-all text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 p-3 rounded border border-red-500/20">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full relative overflow-hidden bg-white text-black py-4 rounded-lg font-bold text-sm tracking-widest uppercase transition-all hover:bg-cyan-50 disabled:opacity-50 mt-4 font-display"
            >
              <div className="flex items-center justify-center gap-3">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>Přihlásit se</span><ArrowRight className="w-4 h-4" /></>}
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
