import {
  Box,
  Chip,
  Divider,
  FormControlLabel,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Switch,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SelectedAttributes } from "@/app/services/services.interfaces";
import AttributesSelector from "../AttributesSelector/AttributesSelector";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));
type AttributesSearchType = {
  selectedAttributes: SelectedAttributes;
  setSelectedAttributes: Dispatch<SetStateAction<SelectedAttributes>>;
};

const AttributesSearch = ({
  selectedAttributes,
  setSelectedAttributes,
}: AttributesSearchType) => {
  const [selectAttributes, setSelectAttributes] = useState(true);
  const [search, setSearch] = useState("");

  const unselectAttribute = (id: number) => {
    const updatedAttributes = { ...selectedAttributes };
    updatedAttributes[id].checked = false;
    setSelectedAttributes(updatedAttributes);
  };

  return (
    <>
      <FormControlLabel
        control={
          <Switch onChange={() => setSelectAttributes(!selectAttributes)} />
        }
        label="Dame resultados de todo tipo"
      />
      <Paper>
        <Box
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            mb: "4px",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Busca los atributos por su nombre"
            inputProps={{ "aria-label": "Busca los atributos por su nombre" }}
            onChange={({ target }) => setSearch(target.value)}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Box>
      </Paper>

      <Divider sx={{ my: "4px" }} />

      {Object.entries(selectedAttributes).filter(
        ([id, value]) => value.checked === true
      ).length > 0 && (
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 0,
          }}
          component="ul"
        >
          {Object.entries(selectedAttributes)
            .filter(([id, value]) => value.checked === true)
            .map(([id, {name}]) => {
              return (
                <ListItem key={id}>
                  <Chip
                    label={name}
                    onDelete={() => unselectAttribute(parseInt(id))}
                  />
                </ListItem>
              );
            })}
        </Paper>
      )}

      <Divider sx={{ my: "4px" }} />

      <AttributesSelector
        selectedAttributes={selectedAttributes}
        setSelectedAttributes={setSelectedAttributes}
        selectAttributes={selectAttributes}
        search={search}
      />
    </>
  );
};

export default AttributesSearch;
