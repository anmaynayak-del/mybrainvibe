"use client";

import React, { useState } from "react";
import Navbar from "./Navbar";
import AssessmentModal from "./CTA/AssessmentModal";
import Footer from "./Footer/Footer";

export default function ClientLayout({ children, showFooter = true }: { children: React.ReactNode, showFooter?: boolean }) {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // We can pass the open function down if children need it, but using React.cloneElement is messy.
  // Instead, we can provide it via Context.
  
  return (
    <BookingContext.Provider value={() => setBookingModalOpen(true)}>
      <Navbar />
      {children}
      {showFooter && <Footer />}
      <AssessmentModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </BookingContext.Provider>
  );
}

export const BookingContext = React.createContext<() => void>(() => {});
