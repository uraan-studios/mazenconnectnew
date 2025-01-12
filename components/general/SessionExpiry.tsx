"use client";

import React, { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';
import { useRouter } from 'next/navigation';



const SessionExpiry = ({ sessionExpiry }: { sessionExpiry: Date | undefined }) => {
  const router = useRouter();
  const [timeToExpiry, setTimeToExpiry] = useState<number | null>(null); // Explicit type for `timeToExpiry`

  useEffect(() => {
    if (!sessionExpiry) return;

    const expiresAt = new Date(sessionExpiry).getTime();

    const updateRemainingTime = () => {
      const now = new Date().getTime();
      setTimeToExpiry(Math.max(expiresAt - now, 0));
    };

    updateRemainingTime(); // Initial call to set time immediately
    const interval = setInterval(updateRemainingTime, 1000); // Update every second

    // Trigger refresh when 10 minutes remain
    if (timeToExpiry !== null && timeToExpiry <= 10 * 60 * 1000 && timeToExpiry > 0) {
      clearInterval(interval);
      router.refresh(); // Correct method to refresh in `next/navigation`
    }

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [sessionExpiry, timeToExpiry, router]);

  if (timeToExpiry === null) return null;

  return (
    <Badge variant="outline" className='py-2'>
      Expiry in: {Math.floor(timeToExpiry / 1000 / 60)} minutes
    </Badge>
  );
};

export default SessionExpiry;
