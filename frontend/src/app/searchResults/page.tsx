import SearchResultsContainer from "@/components/searchResults/SearchResultsContainer";
import { Suspense } from "react";

export default function SearchResults() {
  return (
    <Suspense>
      <SearchResultsContainer />
    </Suspense>
  );
}
