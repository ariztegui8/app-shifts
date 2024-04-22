import "./globals.css";
import { Providers } from "./providers";
import NavbarPage from "@/components/NavbarPage";


export const metadata = {
  title: "App Shifts",
  description: "Shift generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Providers>
          <NavbarPage />
          {children}
        </Providers>
      </body>
    </html>
  );
}
