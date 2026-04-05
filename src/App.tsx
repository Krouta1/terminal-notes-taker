import './App.css';
import Terminal from './components/treminal';
import { HELP_COMMANDS } from './helpers/helpers';

const overviewCards = [
  {
    title: 'Local-first',
    value: 'IndexedDB',
    description: 'Your notes stay in the browser and work instantly.',
  },
  {
    title: 'Fast organize',
    value: '/tag',
    description: 'Group notes with simple tags and reuse them later.',
  },
  {
    title: 'Easy backup',
    value: '/export',
    description: 'Move your notes in and out with JSON import/export.',
  },
];

const navigationTips = [
  'Keep the terminal as the main writing area, with helpful context around it.',
  'Use tags and quick commands to reduce hunting through long note lists.',
  'Stay focused with a clearer visual hierarchy and a calmer dark theme.',
];

function App() {
  return (
    <div className="min-h-screen text-slate-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[28px] border border-white/10 bg-slate-950/75 p-6 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.95)] backdrop-blur sm:p-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              Terminal Notes Taker
            </div>

            <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              A cleaner notes workspace with a modern terminal feel.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Capture ideas, edit them fast, add tags, and search instantly — all in a UI that feels more polished and
              easier to scan.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {HELP_COMMANDS.slice(2).map(({ command }) => (
                <span
                  key={command}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
                >
                  {command}
                </span>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {overviewCards.map(card => (
                <div key={card.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs tracking-[0.2em] text-slate-400 uppercase">{card.title}</p>
                  <p className="mt-2 text-lg font-semibold text-white">{card.value}</p>
                  <p className="mt-1 text-sm leading-5 text-slate-300">{card.description}</p>
                </div>
              ))}
            </div>
          </section>

          <aside className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.95)] backdrop-blur sm:p-7">
            <p className="text-xs font-semibold tracking-[0.28em] text-emerald-300 uppercase">Quick start</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Everything important is one step away.</h2>
            <div className="mt-4 space-y-3">
              {HELP_COMMANDS.slice(0, 5).map(({ command, description }, index) => (
                <div key={command} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-xs font-semibold text-emerald-300">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">{command}</p>
                      <p className="text-xs text-slate-400">{description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </header>

        <main className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_320px]">
          <Terminal />

          <aside className="space-y-4">
            <section className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5 shadow-[0_20px_70px_-45px_rgba(15,23,42,1)]">
              <p className="text-sm font-semibold text-white">Why this layout is easier to navigate</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                {navigationTips.map(tip => (
                  <li key={tip} className="rounded-xl bg-white/5 px-3 py-2">
                    {tip}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[24px] border border-white/10 bg-slate-900/70 p-5 shadow-[0_20px_70px_-45px_rgba(15,23,42,1)]">
              <p className="text-sm font-semibold text-white">Suggested flow</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['/help', '/add', '/list', '/tag', '/search'].map(step => (
                  <span key={step} className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
                    {step}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Start with a quick capture, review your notes, then organize them using tags for faster retrieval.
              </p>
            </section>
          </aside>
        </main>
      </div>
    </div>
  );
}

export default App;
