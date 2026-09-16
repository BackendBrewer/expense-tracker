import Link from 'next/link';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const session = await auth();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navbar */}
      <nav className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-indigo-600">
            <span className="text-2xl">💰</span> Expense Tracker
          </Link>
          <div className="space-x-3">
            <Link href="/login" className="text-gray-600 hover:text-indigo-600 text-sm font-medium">
              Login
            </Link>
            <Link
              href="/register"
              className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-6 py-20 text-center">
        <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
          🚀 Free & Private
        </span>

        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Know Where Every <br />
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Rupee Goes
          </span>
        </h1>

        <p className="text-gray-500 mt-6 text-lg max-w-xl mx-auto">
          Log your income and expenses in seconds. See real charts, spot spending patterns, and stay in control of your money.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/register"
            className="bg-indigo-600 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition"
          >
            Start Tracking Free →
          </Link>
        </div>

        {/* Stats strip */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-xl mx-auto">
          <div>
            <p className="text-2xl font-extrabold text-indigo-600">100%</p>
            <p className="text-xs text-gray-500 mt-1">Private Data</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-indigo-600">0 Rs</p>
            <p className="text-xs text-gray-500 mt-1">Cost to Use</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-indigo-600">3 Sec</p>
            <p className="text-xs text-gray-500 mt-1">To Add Entry</p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-2xl mb-4">
              📊
            </div>
            <h3 className="font-bold text-gray-800">Visual Insights</h3>
            <p className="text-sm text-gray-500 mt-2">Monthly trends and category breakdowns, shown as real charts — not spreadsheets.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl mb-4">
              🔒
            </div>
            <h3 className="font-bold text-gray-800">Private By Design</h3>
            <p className="text-sm text-gray-500 mt-2">Your records are tied only to your account — nobody else can see them.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl mb-4">
              ⚡
            </div>
            <h3 className="font-bold text-gray-800">Simple & Fast</h3>
            <p className="text-sm text-gray-500 mt-2">Add a transaction in seconds. Filter, edit, export — no clutter, no friction.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-400 py-8 border-t border-gray-100">
        &copy; {new Date().getFullYear()} Expense Tracker — Built by Muhammad Salman Zubair
      </footer>
    </div>
  );
}