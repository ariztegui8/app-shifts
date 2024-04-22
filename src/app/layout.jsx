import "./globals.css";
import { Providers } from "./providers";


export const metadata = {
  title: "App Shifts",
  description: "Shift generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
