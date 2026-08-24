import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { QuoteAdminControls } from "@/components/admin/QuoteAdminControls";

export default async function QuotesManagementPage() {
  await requireAdmin();
  
  const quotes = await prisma.kwabenaQuote.findMany({
    orderBy: { createdAt: "asc" }
  });

  return (
    <div className="max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Manage Kobby Once Said</h1>
        
        <QuoteAdminControls isAdd />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {quotes.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">
            No quotes found. Click "Add New Quote" to create one.
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {quotes.map(quote => (
              <li key={quote.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                  <div className="flex-1">
                    <p className="font-serif italic text-lg text-gray-900 mb-2">"{quote.quote}"</p>
                    <div className="flex flex-wrap items-center gap-2 mb-2 text-sm text-gray-600">
                      <span className="font-medium text-[#B89558]">As told by {quote.submittedBy}</span>
                      {quote.context && (
                        <>
                          <span>•</span>
                          <span className="italic">{quote.context}</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="shrink-0 pt-2 md:pt-0">
                    <QuoteAdminControls quoteItem={quote} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
