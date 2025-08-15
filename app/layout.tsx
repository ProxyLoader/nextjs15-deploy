import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"

export const metadata: Metadata = {
  title: "Brother TS ft. Dysle | The original food",
  description: "Welcome to our website here you can find the menu what to eat.",
  icons: {
    icon: "/brother-logo.png",
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
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} antialiased`}
    >
      <head>
        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
          }
        `}</style>

        {/* Initial favicon */}
        <link
          id="dynamic-favicon"
          rel="icon"
          href="/brother-logo.png"
          type="image/png"
        />
        <link rel="apple-touch-icon" href="/brother-logo.png" />

        {/* Script to change favicon & title every 2.5 seconds */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const icons = [
                  { src: "/brother-logo.png", title: "Brother TS | The Original Food" },
                  { src: "/disley.svg", title: "Dysley | The Original Food" }
                ];
                let index = 0;
                setInterval(() => {
                  index = (index + 1) % icons.length;
                  const link = document.getElementById("dynamic-favicon");
                  if (link) {
                    link.href = icons[index].src;
                  }
                  document.title = icons[index].title;
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
