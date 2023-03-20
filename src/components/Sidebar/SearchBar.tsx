import { StyledSearch, StyledSearchInput } from "./styles";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  return (
    <StyledSearch>
      <SearchIcon />
      <StyledSearchInput placeholder="Search" />
    </StyledSearch>
  );
};

export default SearchBar;
