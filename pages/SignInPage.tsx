import { FormEvent, useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, KeyRound, UserRound, LogIn, Eye } from 'lucide-react';

type Tab = 'signin' | 'register';

export function SignInPage() {
  const {
    signIn,
    register,
    loginAsGuest,
    navigate,
    getAvailableUsernames,
    isUsernameAvailable,
  } = useApp();

  const [tab, setTab] = useState<Tab>('signin');
  const [signinName, setSigninName] = useState('');
  const [signinPassword, setSigninPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const availableNames = useMemo(() => getAvailableUsernames(), [getAvailableUsernames]);
  const registerNameAvailable = registerName.trim().length > 0 && isUsernameAvailable(registerName);

  const submitSignIn = (e: FormEvent) => {
    e.preventDefault();
    const result = signIn(signinName, signinPassword);
    if (!result.ok) setFeedback(result.message ?? 'Unable to sign in.');
  };

  const submitRegister = (e: FormEvent) => {
    e.preventDefault();
    const result = register(registerName, registerPassword);
    if (!result.ok) setFeedback(result.message ?? 'Unable to register.');
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-10 min-h-[calc(100vh-90px)] greenhouse-grid flex flex-col justify-center">
      <div className="mb-6 animate-fade-in">
        <p className="text-[10px] font-mono uppercase tracking-[0.26em] text-basil-700 dark:text-basil-300 mb-2">reception ledger</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary dark:text-text-primary-dark">Open the Register</h1>
      </div>

      {/* Tabs for mobile viewing to swap sides, hidden on desktop since both pages show */}
      <div className="lg:hidden flex border-b-2 border-stem/20 dark:border-leaf-light/10 mb-4 pb-2 animate-fade-in">
        <button
          onClick={() => setTab('signin')}
          className={`flex-1 py-3 text-[11px] font-mono uppercase tracking-[0.16em] border-2 ${tab === 'signin' ? 'border-basil-500 text-basil-700 dark:text-basil-300 bg-white/40 dark:bg-white/5' : 'border-transparent text-text-muted dark:text-text-muted-dark'}`}
        >
          Sign In
        </button>
        <button
          onClick={() => setTab('register')}
          className={`flex-1 py-3 text-[11px] font-mono uppercase tracking-[0.16em] border-2 ${tab === 'register' ? 'border-basil-500 text-basil-700 dark:text-basil-300 bg-white/40 dark:bg-white/5' : 'border-transparent text-text-muted dark:text-text-muted-dark'}`}
        >
          Register
        </button>
      </div>

      <div className="hotel-ledger book-entrance">
        <div className="ledger-spine" />
        
        <div className={`ledger-spread ${tab === 'register' ? 'slide-register' : ''}`}>
          {/* Left Page: Sign In (Ledger format) */}
          <section className="ledger-page">
            <div className="h-full p-6 sm:p-10 pt-12 bg-[repeating-linear-gradient(to_bottom,rgba(95,127,104,0.06)_0,rgba(95,127,104,0.06)_1px,transparent_1px,transparent_32px)]">
              <div className="mb-8 flex items-center gap-2 text-basil-700 dark:text-basil-300">
                <BookOpen className="w-5 h-5" />
                <span className="text-[12px] font-mono uppercase tracking-[0.2em] font-bold">Find Your Name</span>
              </div>
              
              <p className="text-sm font-serif italic text-text-muted dark:text-text-muted-dark mb-8">Scan the ledger for your previous entry. Verify your identity with your key phrase.</p>

              <form onSubmit={submitSignIn} className="space-y-6 max-w-sm">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-text-secondary dark:text-text-secondary-dark mb-2">Registered Name</label>
                  <div className="flex items-center border-b-2 border-stem/30 dark:border-leaf-light/30 pb-2">
                    <UserRound className="w-5 h-5 text-stem/70 dark:text-leaf-light/70 mr-3" />
                    <input
                      value={signinName}
                      onChange={(e) => setSigninName(e.target.value)}
                      className="w-full bg-transparent text-lg font-serif text-text-primary dark:text-text-primary-dark focus:outline-none placeholder-text-muted/40"
                      placeholder="e.g. IvyArchitect"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-text-secondary dark:text-text-secondary-dark mb-2">Key Phrase</label>
                  <div className="flex items-center border-b-2 border-stem/30 dark:border-leaf-light/30 pb-2">
                    <KeyRound className="w-5 h-5 text-stem/70 dark:text-leaf-light/70 mr-3" />
                    <input
                      type="password"
                      value={signinPassword}
                      onChange={(e) => setSigninPassword(e.target.value)}
                      className="w-full bg-transparent text-lg font-serif text-text-primary dark:text-text-primary-dark focus:outline-none placeholder-text-muted/40"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button className="btn-fresh w-full flex items-center justify-center gap-2 px-5 py-4 bg-[#2b3a30] text-white border-[#2b3a30] hover:bg-basil-600 hover:text-white mt-8 shadow-md">
                  <LogIn className="w-4 h-4" />
                  Sign The Ledger
                </button>
              </form>

              <div className="mt-12 pt-6 border-t border-stem/20 dark:border-leaf-light/20">
                <button
                  onClick={loginAsGuest}
                  className="flex items-center gap-3 text-sm font-mono uppercase tracking-widest text-text-secondary dark:text-text-secondary-dark hover:text-basil-600 dark:hover:text-basil-400 transition-colors group"
                >
                  <div className="w-8 h-8 border-2 border-current flex items-center justify-center group-hover:bg-basil-500 group-hover:text-white transition-colors">
                    <Eye className="w-4 h-4" />
                  </div>
                  Visitor Pass (View Only)
                </button>
              </div>
            </div>
          </section>

          {/* Right Page: Register (Notepad Checklist format) */}
          <section className="ledger-page notepad-page">
            <div className="h-full pt-12 notepad-content">
              
              <div className="mb-8 pr-8">
                <h2 className="font-mono text-xl font-bold uppercase tracking-widest text-text-primary dark:text-text-primary-dark mb-1">New Arrival</h2>
                <p className="text-xs font-mono uppercase tracking-[0.1em] text-text-muted dark:text-text-muted-dark">Registration Checklist</p>
              </div>

              <form onSubmit={submitRegister} className="pr-8 space-y-[32px] mt-4">
                
                {/* Step 1: Username */}
                <div className="checklist-step">
                  <div className={`checklist-box ${registerName.trim() ? 'bg-basil-500 text-white' : ''}`}>
                    {registerName.trim() && <span className="text-xs">✓</span>}
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-text-secondary dark:text-text-secondary-dark whitespace-nowrap">1. Pick Name:</span>
                  <input
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    className="notepad-input flex-1 min-w-0"
                    placeholder="Enter unused name"
                  />
                </div>
                
                {/* Username validation feedback on a checklist line */}
                {registerName.trim() && (
                  <div className="checklist-step">
                    <div className="w-4" /> {/* Spacer for checkbox */}
                    <span className="text-[11px] font-mono text-text-muted dark:text-text-muted-dark">
                      └─ Status: <strong className={registerNameAvailable ? 'text-basil-600 dark:text-basil-400' : 'text-error'}>
                        {registerNameAvailable ? 'AVAILABLE' : 'ALREADY USED'}
                      </strong>
                    </span>
                  </div>
                )}

                {/* Step 2: Password */}
                <div className="checklist-step">
                  <div className={`checklist-box ${registerPassword.trim() ? 'bg-basil-500 text-white' : ''}`}>
                    {registerPassword.trim() && <span className="text-xs">✓</span>}
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-text-secondary dark:text-text-secondary-dark whitespace-nowrap">2. Set Key:</span>
                  <input
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="notepad-input flex-1 min-w-0"
                    placeholder="Enter secret phrase"
                  />
                </div>

                {/* Step 3: Submit */}
                <div className="checklist-step pt-8">
                  <div className="w-4" /> {/* Spacer */}
                  <button 
                    disabled={!registerName.trim() || !registerPassword.trim() || !registerNameAvailable}
                    className="btn-fresh px-6 py-1 bg-transparent text-text-primary dark:text-text-primary-dark disabled:opacity-50 disabled:cursor-not-allowed hover:bg-basil-50 dark:hover:bg-basil-900"
                  >
                    [ Submit Registration ]
                  </button>
                </div>
              </form>

              {/* Available Names block */}
              <div className="mt-12 pr-8">
                <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-text-muted dark:text-text-muted-dark mb-4">-- Recent Unclaimed Badges --</p>
                <div className="flex flex-wrap gap-x-4 gap-y-3">
                  {availableNames.slice(0, 6).map((name) => (
                    <button
                      key={name}
                      onClick={() => setRegisterName(name)}
                      className="text-[11px] font-mono text-basil-700 dark:text-basil-400 hover:bg-basil-100 dark:hover:bg-basil-900/50 px-1 border-b border-dashed border-basil-300 dark:border-basil-700"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </section>
        </div>
      </div>

      {feedback && (
        <div className="mt-6 mx-auto w-full max-w-2xl border-2 border-error/40 bg-error/8 px-6 py-4 text-sm font-mono text-error-light dark:text-error text-center animate-slide-up">
          [ ERROR: {feedback} ]
        </div>
      )}

      <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <button
          onClick={() => navigate({ type: 'home' })}
          className="text-[11px] font-mono uppercase tracking-[0.16em] text-text-muted dark:text-text-muted-dark hover:text-basil-700 dark:hover:text-basil-300 transition-colors"
        >
          <Eye className="w-4 h-4 inline mr-2" />
          Close Book & Return
        </button>
      </div>
    </div>
  );
}
