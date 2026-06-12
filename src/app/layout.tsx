import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MYRA'S INNOVATION CHALLENGE 2026 | National Competition",
  description: "Register for MYRA'S INNOVATION CHALLENGE 2026. Compete across India in Reel Making, Hackathon, Creative Design, and Blog Writing to win MacBook, iPhone, and Smart Watches.",
  keywords: ["MYRA'S INNOVATION CHALLENGE", "National Hackathon India", "Reel Making Competition", "Design Contest 2026", "Blog Writing Event", "MYRA'S GLOBAL TECH"],
  authors: [{ name: "MYRA'S GLOBAL TECH", url: "https://myraglobaltech.com" }],
  openGraph: {
    title: "MYRA'S INNOVATION CHALLENGE 2026 | Where Creativity Meets Technology",
    description: "Compete nationally in Reel Making, Hackathons, Graphic Design, and Blogs. Register today to win MacBook, iPhone, and Smart Watch prizes.",
    url: "https://challenge.myraglobaltech.com",
    siteName: "MYRA'S INNOVATION CHALLENGE",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://challenge.myraglobaltech.com/og-banner.png",
        width: 1200,
        height: 630,
        alt: "MYRA'S INNOVATION CHALLENGE 2026 Social Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MYRA'S INNOVATION CHALLENGE 2026",
    description: "Join India's premium innovation competition. Win a MacBook, iPhone, or Smart Watch. Register now!",
    images: ["https://challenge.myraglobaltech.com/og-banner.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://challenge.myraglobaltech.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured JSON-LD Event schema
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "MYRA'S INNOVATION CHALLENGE 2026",
    "startDate": "2026-01-15T09:00:00+05:30",
    "endDate": "2026-01-18T18:00:00+05:30",
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "VirtualLocation",
      "url": "https://challenge.myraglobaltech.com"
    },
    "image": [
      "https://challenge.myraglobaltech.com/og-banner.png"
    ],
    "description": "A national-level innovation and talent challenge for creators, designers, writers, and technologists across India.",
    "offers": {
      "@type": "Offer",
      "url": "https://challenge.myraglobaltech.com#register",
      "price": "0",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-11-01T00:00:00+05:30"
    },
    "organizer": {
      "@type": "Organization",
      "name": "MYRA'S GLOBAL TECH",
      "url": "https://myraglobaltech.com"
    }
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white">{children}</body>
    </html>
  );
}
