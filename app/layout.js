import { Suspense } from "react";
import { Raleway } from "next/font/google";
import Loading from "./loading"
import "./globals.css";

const raleway = Raleway({
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
  title: "MemeMasterpiece",
  description: "An exposition of r/memes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  );
}
