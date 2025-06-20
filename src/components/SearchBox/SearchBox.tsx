import css from "./SearchBox.module.css";

interface SearchBoxProps {
  search: string;
  setSearch: (val: string) => void;
}

const SearchBox = ({ search, setSearch }: SearchBoxProps) => (
  <input
    className={css.input}
    type="text"
    placeholder="Search notes"
    value={search}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
      setSearch(e.target.value)
    }
  />
);

export default SearchBox;
