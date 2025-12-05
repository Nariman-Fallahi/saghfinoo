import SearchResultsContainer from "@/components/SearchResults/SearchResultsContainer";
import { Suspense } from "react";

export default function SearchResults() {
  return (
    <Suspense>
      <SearchResultsContainer />
    </Suspense>
  );
}
