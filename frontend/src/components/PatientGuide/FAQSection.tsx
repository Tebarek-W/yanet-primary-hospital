import { useState } from 'react';
import { HelpCircle, ChevronDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    category: "General",
    question: "What are your operating hours?",
    answer: "Our emergency department is open 24/7. Outpatient clinics operate from 8:00 AM to 5:00 PM, Monday through Saturday."
  },
  {
    category: "General",
    question: "Is parking available at the hospital?",
    answer: "Yes, we have a dedicated patient and visitor parking lot located on the west side of the building. Parking is free for the first 2 hours."
  },
  {
    category: "Appointments",
    question: "How do I schedule an appointment?",
    answer: "You can schedule an appointment by clicking the 'Book Appointment' button on our website, calling our reception, or visiting us in person."
  },
  {
    category: "Appointments",
    question: "What should I do if I need to cancel my appointment?",
    answer: "Please call us at least 24 hours in advance to cancel or reschedule your appointment so we can offer the slot to another patient."
  },
  {
    category: "Billing",
    question: "Do you accept international insurance?",
    answer: "Yes, we accept several international insurance providers. Please contact our billing department prior to your visit to verify your specific coverage."
  },
  {
    category: "Medical Records",
    question: "How can I get a copy of my medical records?",
    answer: "You can request a copy of your medical records by visiting the Medical Records department with a valid photo ID and filling out a release form."
  }
];

export const FAQSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b pb-4">
        <HelpCircle className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold text-secondary">Frequently Asked Questions</h2>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition duration-150 ease-in-out"
          placeholder="Search FAQs by question, keyword, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-100 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow duration-300"
            >
              <button
                className="w-full text-left px-6 py-4 focus:outline-none flex justify-between items-center"
                onClick={() => toggleFaq(index)}
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-primary tracking-wider mb-1 block">
                    {faq.category}
                  </span>
                  <span className="font-semibold text-secondary text-lg">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-primary' : ''}`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-5 text-secondary/70 prose">
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-secondary/60">No frequently asked questions found matching your search.</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-4 text-primary hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
