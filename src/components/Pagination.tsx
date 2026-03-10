import React, { useMemo, useCallback } from "react";

type PgProps = {
  total: number;
  limit: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const PaginationComponent = ({
  total,
  limit,
  currentPage,
  onPageChange,
}: PgProps) => {
  const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit]);

  const goPrev = useCallback(() => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  }, [currentPage, onPageChange]);

  const goNext = useCallback(() => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  }, [currentPage, totalPages, onPageChange]);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={goPrev}
        disabled={currentPage === 1}
        className="
        px-3 py-2 rounded-lg
        bg-[var(--color-sand)]
        hover:[bg-var(--color-latte)]
        cursor-pointer
        disabled:opacity-40
      "
      >
        ←
      </button>
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
            px-4 py-2 rounded-lg transition cursor-pointer
            ${
              currentPage === page
                ? "bg-[var(--color-coffee)] text-black text-2xl"
                : "bg-[var(--color-sand)] hover:bg-[var(--color-latte)]"
            }
          `}
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={goNext}
        disabled={currentPage === totalPages}
        className="
        px-3 py-2 rounded-lg
        bg:[var(--color-sand)]
        hover:bg-[var(--color-latte)]
        disabled:opacity-40
        cursor-pointer
      "
      >
        →
      </button>
    </div>
  );
};

export const Pagination = React.memo(PaginationComponent);
