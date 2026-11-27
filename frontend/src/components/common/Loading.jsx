
const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-rent-background">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-rent-primary/20 border-t-rent-primary" />

      <p className="mt-4 animate-pulse font-medium text-rent-primary">
        Đang tải dữ liệu...
      </p>
    </div>
  );
};

export default Loading;