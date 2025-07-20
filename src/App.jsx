import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import Home from "@/components/pages/Home";
import Resources from "@/components/pages/Resources";
import Pricing from "@/components/pages/Pricing";
import Dashboard from "@/components/pages/Dashboard";
import Account from "@/components/pages/Account";
import Forum from "@/components/pages/Forum";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        
        <main className="flex-1">
<Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/account" element={<Account />} />
            <Route path="/forum" element={<Forum />} />
          </Routes>
        </main>
        
        <Footer />
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="!rounded-lg !shadow-lg"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;