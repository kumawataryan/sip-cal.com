import './globals.css';
import type { Metadata } from 'next';
import { ABeeZee } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider"


const abeezee = ABeeZee({
  subsets: ['latin'],
  weight: '400'
});

export const metadata: Metadata = {
  title: 'SIP-CAL(Best Online Systematic Investment Plan Calculator)',
  description: 'Discover how a SIP Calculator helps estimate returns on mutual fund investments. Learn its benefits, formula, and usage with our detailed guide.',
  keywords: 'SIP Calculator, Systematic Investment Plan Calculator, mutual fund SIP, SIP return calculator, best SIP calculator online, Groww SIP calculator',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <body className={abeezee.className}>{children}</body>
      </ThemeProvider>
    </html>
  );
}
