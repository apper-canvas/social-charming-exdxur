const SearchSkeleton = () => {
  return (
    <div className="bg-surface rounded-xl shadow-sm border border-gray-200 p-4 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-24 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-48" />
        </div>
        <div className="w-20 h-8 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
};

export default SearchSkeleton;