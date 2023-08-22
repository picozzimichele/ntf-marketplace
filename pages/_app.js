import "../styles/globals.css";
import { Footer, Navbar } from "../components";
import { ThemeProvider } from "next-themes";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider attribute="class">
            <div className="dark:bg-nft-dark bg-white min-h-screen">
                <Navbar />
                <div className="pt-65">
                    <Component {...pageProps} />
                </div>
                <Footer />
            </div>
            <Script src="https://kit.fontawesome.com/74944751be.js" crossorigin="anonymous" />
        </ThemeProvider>
    );
}

export default MyApp;
