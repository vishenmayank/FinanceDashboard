import "./globals.css";
import { AppProvider } from "./context/AppContext";
import { ThemeProvider } from "./context/ThemeContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
              try {
                const storedTheme = localStorage.getItem("theme");
                const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                const theme =
                  storedTheme === "dark" || storedTheme === "light"
                    ? storedTheme
                    : prefersDark
                      ? "dark"
                      : "light";
                const root = document.documentElement;
                root.classList.remove("light", "dark");
                root.classList.add(theme);
                root.style.colorScheme = theme;
              } catch (error) {}
            })();`,
          }}
        />
        <ThemeProvider>
          <AppProvider>{children}</AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
