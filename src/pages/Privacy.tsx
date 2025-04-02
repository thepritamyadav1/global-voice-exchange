
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg mb-6">Last updated: April 2023</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              We collect information you provide directly to us when you create an account, submit feedback, or communicate with us. This may include your name, email address, demographic information, and the content of your feedback.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect to provide, maintain, and improve our services, including to process transactions, send you related information, and provide customer support.
            </p>
            <p className="mb-4">
              For brands, we use the information to provide insights and analytics about consumer feedback.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">3. Information Sharing</h2>
            <p className="mb-4">
              We may share your information with brands when you submit feedback about their products or services. However, we will always do this in accordance with your consent and the choices you've made in your account settings.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Your Choices</h2>
            <p className="mb-4">
              You can control the information you provide to us and manage your account settings. You can also request access to the personal data we hold about you.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">5. Security</h2>
            <p className="mb-4">
              We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">6. Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">7. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@globalvoice.com" className="text-primary hover:underline">privacy@globalvoice.com</a>.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
