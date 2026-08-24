import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { QuoteAdminControls } from "@/components/admin/QuoteAdminControls";

export default async function QuotesManagementPage() {
  await requireAdmin();
  
  const quotes = await prisma.kwabenaQuote.findMany({
    orderBy: { createdAt: "asc" }
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Manage Quotes</h1>
        
        <QuoteAdminControls isAdd />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {quotes.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm bg-gray-50/50">
            No quotes found. Click "Add New Quote" to create one.
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {quotes.map(quote => (
              <li key={quote.id} className="p-5 sm:p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row gap-4 justify-between">
                <div className="flex-1 min-w-0">
                  <p className="font-serif italic text-lg sm:text-xl text-gray-900 mb-3 break-words">"{quote.quote}"</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2 text-[13px] text-gray-600">
                    <span className="font-semibold text-[#5C202C] tracking-wide uppercase">As told by {quote.submittedBy}</span>
                    {quote.context && (
                      <>
                        <span className="hidden sm:inline text-gray-300">•</span>
                        <span className="text-gray-500">{quote.context}</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="shrink-0 border-t border-gray-100 md:border-0 pt-4 mt-2 md:pt-0 md:mt-0 flex justify-end">
                  <QuoteAdminControls quoteItem={quote} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
