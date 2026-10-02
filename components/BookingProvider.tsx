"use client";

import React, { createContext, useContext, useState } from "react";
import AssessmentModal from "./CTA/AssessmentModal";

type BookingContextType = {
  openBooking: () => void;
};

const BookingContext = createContext<BookingContextType>({
  openBooking: () => {},
});

export const useBooking = () => useContext(BookingContext);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BookingContext.Provider value={{ openBooking: () => setIsOpen(true) }}>
      {children}
      <AssessmentModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </BookingContext.Provider>
  );
}
