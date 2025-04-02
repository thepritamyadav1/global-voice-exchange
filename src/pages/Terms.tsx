
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg mb-6">Last updated: April 2023</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to GlobalVoice. By using our website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Definitions</h2>
            <p className="mb-4">
              "GlobalVoice", "we", "us", and "our" refer to the company operating the GlobalVoice platform.
            </p>
            <p className="mb-4">
              "User", "you", and "your" refer to individuals who use our platform, either as consumers providing feedback or brands receiving feedback.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">3. User Accounts</h2>
            <p className="mb-4">
              To use certain features of our service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Content Guidelines</h2>
            <p className="mb-4">
              When submitting feedback, you agree not to post content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">5. Privacy</h2>
            <p className="mb-4">
              Our Privacy Policy describes how we handle the information you provide to us when you use our services. You understand that through your use of the services, you consent to the collection and use of this information.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">6. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these Terms at any time. We will always post the most current version on our site. By continuing to use our services, you agree to be bound by the current version of these Terms.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">7. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us at <a href="mailto:support@globalvoice.com" className="text-primary hover:underline">support@globalvoice.com</a>.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
