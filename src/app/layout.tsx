import type { Metadata } from "next";
import { Inter, Noto_Sans_Bengali, Noto_Serif_Bengali } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/lib/themes/provider";
import { Navbar } from "@/components/layout/navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const noto_sans_bengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-sans-bengali",
});
const noto_serif_bengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-serif-bengali",
});

export const metadata: Metadata = {
  title: "বঙ্গবিশ্ব - হাজার বছরের বাংলা",
  description: "বঙ্গবিশ্ব - বাংলা ভাষা, জাতি, সংস্কৃতি, ইতিহাস এবং প্রযুক্তির বিশ্বকোষ। ডিজিটাল রেনেসাঁর সাক্ষী হউন।",
  keywords: ["বঙ্গবিশ্ব", "বাংলা", "বাংলাদেশ", "পশ্চিমবঙ্গ", "বাঙালি", "সংস্কৃতি", "ইতিহাস", "সাহিত্য", "প্রযুক্তি"],
  authors: [{ name: "বঙ্গবিশ্ব টিম" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "বঙ্গবিশ্ব - হাজার বছরের বাংলা",
    description: "বাংলা ভাষা, জাতি, সংস্কৃতি, ইতিহাস এবং প্রযুক্তির বিশ্বকোষ",
    url: "https://bongobishwa.com",
    siteName: "বঙ্গবিশ্ব",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "বঙ্গবিশ্ব - হাজার বছরের বাংলা",
    description: "বাংলা ভাষা, জাতি, সংস্কৃতি, ইতিহাস এবং প্রযুক্তির বিশ্বকোষ",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-next-pathname") || "/";

  return (
    <html lang="bn" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${noto_sans_bengali.variable} ${noto_serif_bengali.variable} font-sans antialiased`}
        data-gramm="false"
      >
        <ThemeProvider pathname={pathname}>
          <div className="relative min-h-screen">
            <Navbar />
            <main className="pt-16">
              {children}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
