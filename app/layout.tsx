
import "./globals.css";
import { AppProvider } from "./context/AppContext";




export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
