import { useState, useEffect } from "react";
import {
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import NoteList from "../NoteList/NoteList.tsx";
import NoteModal from "../NoteModal/NoteModal.tsx";
import SearchBox from "../SearchBox/SearchBox.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import { fetchNotes } from "../../services/noteService.ts";
import css from "./App.module.css";

const App = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const queryKey = ["notes", debouncedSearch, page];

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () => fetchNotes(debouncedSearch, page),
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (value: string): void => {
    setSearch(value);
  };
  const handlePageChange = (page: number): void => {
    setPage(page);
  };
  const handleModalClose = (): void => {
    setIsModalOpen(false);
  };
  const handleModalSuccess = (): void => {
    queryClient.invalidateQueries({ queryKey: ["notes"] });
    setIsModalOpen(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={search} setSearch={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note
        </button>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching notes</p>}
      {data && data.notes.length ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found</p>
      )}

      {isModalOpen && (
        <NoteModal onClose={handleModalClose} onSuccess={handleModalSuccess} />
      )}
    </div>
  );
};

export default App;
