import React, { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { faqs } from '../data/faqs';

// Accordion of frequently asked questions. The first answer starts open; one opens at a time.
export default function FaqSection({ openCircleModal }) {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  return (
    <section id="faq" className="scroll-mt-16 py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-amber-500/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="lg:col-span-4"
        >
          <p className="text-xs font-bold text-amber-500 tracking-widest uppercase">FAQs</p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-serif font-bold text-theme-heading">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-theme-body">
            Answers to what people usually ask before starting their KENNIX journey.
          </p>
          <p className="mt-6 text-sm text-theme-muted">Still have a question?</p>
          <button
            type="button"
            onClick={openCircleModal}
            className="mt-3 px-6 py-3 rounded-full bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-700 transition-colors"
          >
            Talk to KENNIX
          </button>
        </motion.div>

        <div className="lg:col-span-8 space-y-3">
          {faqs.map(({ question, answer }, index) => {
            const isOpen = openIndex === index;
            const buttonId = `${baseId}-question-${index}`;
            const panelId = `${baseId}-answer-${index}`;
            return (
              <div
                key={question}
                className="rounded-2xl glass-card"
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full flex items-start justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
                  >
                    <span className="flex gap-3 sm:gap-4">
                      <span aria-hidden="true" className="pt-0.5 text-xs font-bold text-amber-500 tabular-nums">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-base sm:text-lg font-serif font-bold text-theme-heading">{question}</span>
                    </span>
                    <Plus
                      aria-hidden="true"
                      className={`mt-1 w-5 h-5 shrink-0 text-amber-500 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 sm:px-6 pb-6 pl-12 sm:pl-[3.75rem] text-sm leading-relaxed text-theme-body">
                        {answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
