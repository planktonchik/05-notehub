import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => (
  <ReactPaginate
    pageCount={totalPages}
    forcePage={currentPage - 1}
    onPageChange={(selectedItem) => onPageChange(selectedItem.selected + 1)}
    previousLabel="<"
    nextLabel=">"
    containerClassName={css.pagination}
    activeClassName={css.active}
  />
);

export default Pagination;
