import { useEffect, useState } from "react";
import DesktopHome from "../pages/DesktopHome";
import MobileHome from "../pages/MobileHome";

function Home() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return isMobile ? <MobileHome /> : <DesktopHome />;
}

export default Home;
