import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";

export const StyledSearch = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 2px;
`;

export const StyledSearchInput = styled.input`
  outline: none;
  border: none;
  flex: 1;
`;

const SearchBar = ({ onInputChange }: { onInputChange?: (e: any) => void }) => {
  return (
    <StyledSearch>
      <SearchIcon />
      <StyledSearchInput onChange={onInputChange} placeholder="Search" />
    </StyledSearch>
  );
};

export default SearchBar;
