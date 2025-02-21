import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/themeprovider";
import { ModeToggle } from "@/components/modetoggle";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Quiz App using the Open Trivia Database",
  description:
    "This is a trivia app built in NextJs using the Open Trivia Database API, ShadcnUI and TailwindCSS",
  keywords: [
    "quiz",
    "trivia",
    "tsbsankara",
    "opentdb",
    "shadcn",
    "tailwindcss",
  ],
  author: "TsbSankara",
  version: "1.0.0",
  repository: "https://github.com/sankthomas/trivia-app",
  license: "MIT",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ModeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
