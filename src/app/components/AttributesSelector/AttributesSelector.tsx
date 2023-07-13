import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Paper,
  List,
  FormControlLabel,
  FormGroup,
  FormControl,
  Checkbox,
  Grid,
} from "@mui/material";
import { ChangeEvent } from "react";
import { SelectedAttributes } from "@/app/services/services.interfaces";

type AttributesSelectorType = {
  selectedAttributes: SelectedAttributes;
  setSelectedAttributes: Dispatch<SetStateAction<SelectedAttributes>>;
  selectAttributes: boolean;
  search: string;
};

const AttributesSelector = ({
  selectedAttributes,
  setSelectedAttributes,
  selectAttributes,
  search,
}: AttributesSelectorType) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const id = parseInt(event.target.name);
    const updatedAttributes = {
      ...selectedAttributes,
      [id]: { ...selectedAttributes[id], checked: event.target.checked },
    };
    setSelectedAttributes(updatedAttributes);
  };

  const [filteredAttributes, setFilteredAtributes] =
    useState(selectedAttributes);

  useEffect(() => {
    if (search === "") {
      setFilteredAtributes(selectedAttributes);
    }
    const newAttr = Object.fromEntries(
      Object.entries(selectedAttributes).filter(([id, value]) =>
        value.name.toLowerCase().includes(search.toLowerCase())
      )
    );
    setFilteredAtributes(newAttr);
  }, [search, selectedAttributes]);

  return (
    <>
      <Paper elevation={3} sx={{ p: "2rem 2rem" }}>
        <FormGroup>
          <FormControl
            sx={{ m: 3 }}
            component="fieldset"
            variant="standard"
            disabled={!selectAttributes}
          >
            <FormGroup>
              <List
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  bgcolor: "background.paper",
                  position: "relative",
                  overflow: "auto",
                  maxHeight: 300,
                  "& ul": { padding: 0 },
                }}
                subheader={<li />}
              >
                <Grid container>
                  {Object.entries(filteredAttributes).map(
                    ([id, { checked, name }]) => {
                      return (
                        <Grid item key={id} xs={6} md={4} lg={3}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checked}
                                onChange={handleChange}
                                name={id.toString()}
                              />
                            }
                            label={name}
                          />
                        </Grid>
                      );
                    }
                  )}
                </Grid>
              </List>
            </FormGroup>
          </FormControl>
        </FormGroup>
      </Paper>
    </>
  );
};

export default AttributesSelector;
