
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const UserFAQ = () => {
  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions for Users</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>How do I submit my first feedback?</AccordionTrigger>
          <AccordionContent>
            You can submit feedback by clicking on the "Submit New Feedback" button in your dashboard. 
            Select a product, rate it, write your detailed feedback, and optionally include a video. 
            Your submission will be reviewed, and upon approval, you'll earn rewards.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2">
          <AccordionTrigger>How do I earn more points and increase my level?</AccordionTrigger>
          <AccordionContent>
            You earn 150 points for each feedback submission. As you accumulate points, you'll progress 
            from Bronze to Silver, Gold, and Platinum reviewer levels. Higher levels unlock better rewards 
            and higher payouts for your feedback.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-3">
          <AccordionTrigger>How long does it take for my feedback to be approved?</AccordionTrigger>
          <AccordionContent>
            Typically, feedback is reviewed within 2-3 business days. Once approved, 
            your reward will be credited to your account, and you'll receive a notification.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-4">
          <AccordionTrigger>How do I withdraw my earnings?</AccordionTrigger>
          <AccordionContent>
            You can request a payout from the Rewards tab in your dashboard. 
            We support bank transfers and UPI payments. The minimum withdrawal amount is ₹500, 
            and processing typically takes 3-5 business days.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-5">
          <AccordionTrigger>What type of feedback is most valuable?</AccordionTrigger>
          <AccordionContent>
            The most valuable feedback is detailed, honest, and specific. Include both positive aspects 
            and areas for improvement. Video feedback generally receives higher rewards than text-only submissions.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default UserFAQ;
