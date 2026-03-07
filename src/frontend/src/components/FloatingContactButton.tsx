import { MessageCircle, Phone, X } from "lucide-react";
import React, { useState } from "react";

export default function FloatingContactButton() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {expanded && (
        <>
          <a
            href="https://wa.me/97577421966"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-full shadow-lg transition-all duration-200 font-medium text-sm"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
          <a
            href="tel:77421966"
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 rounded-full shadow-lg transition-all duration-200 font-medium text-sm"
            title="Call us"
          >
            <Phone className="w-4 h-4" />
            <span>+975 77421966</span>
          </a>
        </>
      )}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
        aria-label={expanded ? "Close contact options" : "Open contact options"}
      >
        {expanded ? <X className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
      </button>
    </div>
  );
}
