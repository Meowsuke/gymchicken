import Header from "@/components/shared/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <Header />
        <main className="flex-1 wrapper">{children}</main>
        <Footer />
      </ThemeProvider>
    </div>
  );
}
