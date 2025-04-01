import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

export function FAQs({ faqs }: { faqs: FAQ[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, i) => (
        <AccordionItem
          key={i}
          value={`faq-${i}`}
          className="border-b border-gray-200 dark:border-gray-700"
        >
          <AccordionTrigger className="text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 dark:text-gray-300">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
