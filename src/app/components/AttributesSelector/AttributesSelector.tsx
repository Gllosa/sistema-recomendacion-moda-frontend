import { useState } from "react";
import {
  Paper,
  Switch,
  FormControlLabel,
  FormGroup,
  FormControl,
  FormLabel,
  Checkbox,
  Divider,
  Grid,
} from "@mui/material";
import { ChangeEvent } from "react";

const AttributesSelector = () => {
  const attributes = {
    atributo1: false,
    atributo2: false,
    atributo3: false,
    atributo4: false,
    atributo5: false,
    atributo6: false,
  };

  const [selectAttributes, setSelectAttribute] = useState(true);
  const [selectedAttributes, setSelectedAttributes] = useState(attributes);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedAttributes({
      ...selectedAttributes,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <>
      <Paper elevation={3} sx={{ p: "2rem 2rem" }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                defaultChecked
                onChange={() => setSelectAttribute(!selectAttributes)}
              />
            }
            label="Dame resultados de todo tipo"
          />
          <Divider />
          <FormControl
            sx={{ m: 3 }}
            component="fieldset"
            variant="standard"
            disabled={selectAttributes}
          >
            <FormLabel component="legend">
              Elige los campos más importantes
            </FormLabel>
            <FormGroup>
              <Grid container>
                {Object.keys(attributes).map((attributeName) => {
                  return (
                    <Grid item key={attributeName} xs={6} md={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              selectedAttributes[
                                attributeName as keyof typeof selectedAttributes
                              ]
                            }
                            onChange={handleChange}
                            name={attributeName}
                          />
                        }
                        label={attributeName}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </FormGroup>
          </FormControl>
        </FormGroup>
      </Paper>
    </>
  );
};

export default AttributesSelector;
