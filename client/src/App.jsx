import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout.jsx";
import { ChatWidget } from "./components/ChatWidget.jsx";
import { About } from "./pages/About.jsx";
import { Blog } from "./pages/Blog.jsx";
import { Faq } from "./pages/Faq.jsx";
import { Home } from "./pages/Home.jsx";
import { Locations } from "./pages/Locations.jsx";
import { Pricing } from "./pages/Pricing.jsx";
import { RentOut } from "./pages/RentOut.jsx";

function NotFound() {
  return (
    <main className="page">
      <h1>Sidan hittades inte</h1>
      <p>Dubbelkolla länken.</p>
    </main>
  );
}

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/lokaler" element={<Locations />} />
          <Route path="/hyr-ut" element={<RentOut />} />
          <Route path="/priser" element={<Pricing />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/blogg" element={<Blog />} />
          <Route path="/om-oss" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ChatWidget />
    </>
  );
}
