
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  type: "user" | "brand";
}

const FAQ = ({ type }: FAQProps) => {
  const userFaqs = [
    {
      question: "How much can I earn from submitting feedback?",
      answer: "Earnings vary based on the quality and depth of your feedback. Typically, you can earn ₹300-₹1500 per approved submission depending on the product category and detail level."
    },
    {
      question: "How long does it take to get approved?",
      answer: "The review process typically takes 2-3 business days. You'll receive a notification once your feedback is approved or if we need additional information."
    },
    {
      question: "How do I level up my reviewer status?",
      answer: "You earn points with each approved submission. As you accumulate points, you'll progress through Bronze, Silver, Gold, and Platinum tiers, unlocking higher rewards and exclusive opportunities."
    },
    {
      question: "When will I receive payment?",
      answer: "You can request a payout anytime your available balance exceeds ₹500. Payments are typically processed within 3-5 business days to your preferred payment method."
    },
    {
      question: "What happens if my feedback is rejected?",
      answer: "If your feedback is rejected, you'll receive specific reasons why. You can revise and resubmit your feedback based on the feedback provided."
    }
  ];

  const brandFaqs = [
    {
      question: "How do I add products to receive feedback?",
      answer: "You can add products through your brand dashboard. Navigate to the 'Products' section and click 'Add New Product' to provide details and create a listing for feedback."
    },
    {
      question: "How is pricing determined?",
      answer: "Pricing is customized based on your specific needs, including the number of products, feedback volume, and additional features required. Contact our team for a personalized quote."
    },
    {
      question: "Can I specify which demographic I want feedback from?",
      answer: "Yes, you can target specific demographics including age groups, genders, locations, and user interests to get the most relevant feedback for your products."
    },
    {
      question: "How quickly will I receive feedback?",
      answer: "You'll typically start receiving feedback within 48 hours of activating your campaign. The volume depends on your plan and targeting preferences."
    },
    {
      question: "Can I download and share the feedback reports?",
      answer: "Yes, you can download comprehensive reports in CSV format from your dashboard at any time. These reports can be shared with your team or imported into other analytics tools."
    }
  ];

  const faqs = type === "user" ? userFaqs : brandFaqs;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
