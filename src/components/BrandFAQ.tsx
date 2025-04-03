
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const BrandFAQ = () => {
  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions for Brands</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>How does the GlobalVoice platform work for brands?</AccordionTrigger>
          <AccordionContent>
            Our platform connects your brand with real users who provide detailed, authentic feedback 
            on your products. Users submit ratings, written reviews, and video testimonials. 
            You gain access to invaluable consumer insights through your brand dashboard.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2">
          <AccordionTrigger>How is the feedback quality ensured?</AccordionTrigger>
          <AccordionContent>
            All feedback undergoes a thorough review process before becoming visible on your dashboard. 
            We verify authenticity, ensure comprehensive reviews, and filter out low-quality submissions. 
            Our reviewer tier system also incentivizes users to provide higher-quality feedback.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-3">
          <AccordionTrigger>What insights will I get from the analytics dashboard?</AccordionTrigger>
          <AccordionContent>
            Our analytics dashboard provides comprehensive insights including average ratings, 
            rating distribution, sentiment analysis, feedback trends over time, and demographic breakdowns. 
            You can filter data by product, date range, and user demographics for targeted insights.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-4">
          <AccordionTrigger>How can I request specific feedback for new products?</AccordionTrigger>
          <AccordionContent>
            Premium and Enterprise subscribers can create targeted feedback campaigns for specific products. 
            You can define the demographics you want feedback from and the specific aspects you'd like users to focus on. 
            Contact your account manager to set up a new campaign.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-5">
          <AccordionTrigger>How much does the service cost?</AccordionTrigger>
          <AccordionContent>
            Our pricing is customized based on your brand's size, industry, and specific needs. 
            We offer Basic, Premium, and Enterprise plans with different features and levels of support. 
            Please contact our sales team for a personalized quote.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default BrandFAQ;
