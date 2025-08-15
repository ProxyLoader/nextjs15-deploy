import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"

export const metadata: Metadata = {
  title: "Brother TS | The Original Food",
  description: "Welcome to our website — here you can find the menu and decide what to eat.",
  openGraph: {
    title: "Brother TS | The Original Food",
    description: "Welcome to our website — here you can find the menu and decide what to eat.",
    images: ["/brother-logo.png"],
  },
  twitter: {
    card: "summary",
    title: "Brother TS | The Original Food",
    description: "Welcome to our website — here you can find the menu and decide what to eat.",
    images: ["/brother-logo.png"],
  },
  icons: {
    icon: "/brother-logo.png",
    apple: "/brother-logo.png",
  },
}

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <head>
        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
          }
        `}</style>

        {/* Dynamic favicon */}
        <link id="dynamic-favicon" rel="icon" href="/brother-logo.png" type="image/png" />

        {/* Runtime script to swap title & favicon */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const items = [
                  { icon: "/brother-logo.png", title: "Brother TS | The Original Food" },
                  { icon: "/disley.svg", title: "Dysley | The Original Food" }
                ];
                let i = 0;
                setInterval(() => {
                  i = (i + 1) % items.length;
                  const link = document.getElementById("dynamic-favicon");
                  if (link) link.href = items[i].icon;
                  document.title = items[i].title;
                  const metaDesc = document.querySelector('meta[name="description"]');
                  if (metaDesc) metaDesc.setAttribute("content", items[i].title);
                }, 2500);
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
