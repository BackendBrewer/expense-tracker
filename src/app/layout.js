import { Providers } from './providers';
import './globals.css';

export const metadata = {
  title: 'Expense Tracker',
  description: 'Track your income and expenses with visual insights',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}