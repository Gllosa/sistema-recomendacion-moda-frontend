export interface Attr {
  name: string
  checked: boolean
}

export interface LabelDescriptions {
  categories: Attribute[];
  attributes: Attribute[];
}

export interface Attribute {
  id: number;
  name: string;
  supercategory: string;
  level: number;
}

export interface AttributesName {
  id: number;
  name: string
}


export interface SelectedAttributes {
  [id: number]: Attr
}