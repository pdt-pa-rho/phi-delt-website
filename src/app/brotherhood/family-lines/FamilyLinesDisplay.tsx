"use client";

import useSWR from 'swr';
import FamilyLineSearch from './FamilyLineSearch';
import FamilyLineCarousel from './FamilyLineCarousel';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function FamilyLinesDisplay() {
  const {
    data: famLineData,
    isLoading,
    error
  } = useSWR('/api/family');

  return (
    <>
      {isLoading && <LoadingSpinner />}

      {error && (
        <div className="text-center py-4 text-red-500">
          <p>There was an error loading the featured matches.</p>
        </div>
      )}

      {famLineData?.forest && (
        <>
          <FamilyLineSearch forest={famLineData.forest} />
          <FamilyLineCarousel forest={famLineData.forest} />
        </>
      )}
    </>
  );
};
