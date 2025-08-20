// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import '../styles/globals.css';


// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }


// pages/_app.jsx
import "bootstrap/dist/css/bootstrap.min.css"; // CSS ok globally
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Import Bootstrap JS only on client
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
