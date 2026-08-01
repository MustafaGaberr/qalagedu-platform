import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/features/marketing/data/landing";

export function FAQSection() {
  return (
    <Accordion
      defaultValue={["faq-0"]}
      className="rounded-3xl border bg-card px-4 py-2 shadow-sm shadow-foreground/5"
    >
      {faqItems.map((item, index) => (
        <AccordionItem key={item.question} value={`faq-${index}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
