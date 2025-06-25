import { FC } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/pagination";

interface PaginationControlsProps {
  setPage: (value: number) => void;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  pagination,
  setPage,
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() =>
              pagination.currentPage > 1 && setPage(pagination.currentPage - 1)
            }
          />
        </PaginationItem>
        {[...Array(pagination.totalPages)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              onClick={() => setPage(index + 1)}
              isActive={pagination.currentPage === index}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              pagination.currentPage < pagination.totalPages &&
              setPage(pagination.currentPage + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
