import { Dispatch, SetStateAction, useState } from "react";
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
import { SelectedAttributtes } from "@/app/services/services.interfaces";

const attributtes = {
  135: "Silhueta ajustada",
  136: "Silhueta normal",
  115: "Silhueta simetrica",
  146: "Largo por encima de la cadera",
  317: "Sin estampado",
};

type AttributesSelectorType = {
  selectedAttributes: SelectedAttributtes;
  setSelectedAttributes: Dispatch<SetStateAction<SelectedAttributtes>>;
};

const AttributesSelector = ({
  selectedAttributes,
  setSelectedAttributes,
}: AttributesSelectorType) => {
  const [selectAttributes, setSelectAttribute] = useState(true);

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
              Elige los atributos más importantes
            </FormLabel>
            <FormGroup>
              <Grid container>
                {Object.keys(attributtes).map((attributeId) => {
                  return (
                    <Grid item key={attributeId} xs={6} md={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              selectedAttributes[
                                attributeId as unknown as keyof SelectedAttributtes
                              ]
                            }
                            onChange={handleChange}
                            name={attributeId}
                          />
                        }
                        label={
                          attributtes[
                            attributeId as unknown as keyof SelectedAttributtes
                          ]
                        }
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
