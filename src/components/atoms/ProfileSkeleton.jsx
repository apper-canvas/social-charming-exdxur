const ProfileSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Profile Header */}
      <div className="bg-surface rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-200 rounded-full" />
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
              <div>
                <div className="h-6 bg-gray-200 rounded w-32 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-24" />
              </div>
              <div className="w-20 h-8 bg-gray-200 rounded-xl" />
            </div>
            <div className="h-4 bg-gray-200 rounded w-64 mb-4" />
            <div className="flex gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="text-center">
                  <div className="h-6 bg-gray-200 rounded w-8 mb-1" />
                  <div className="h-4 bg-gray-200 rounded w-12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-200 rounded w-20 mr-4" />
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-1 md:gap-2">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200 rounded-lg" />
        ))}
      </div>
    </div>
  );
};

export default ProfileSkeleton;