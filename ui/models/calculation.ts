export interface XLStoreApp {
  id: string,
  name: string,
  lastNonDraftVersion: number
}

export interface XLStoreAppDetails {
  id: string
  name: string
  lastNonDraftVersion: number
  metaFields: MetaField[]
  inputFields: InputField[]
  outputFields: OutputField[]
}

export interface MetaField {
  name: string
  value: string
}

export interface InputField {
  name: string
  fieldType: "boolean" | "integer" | "float" | "date" | "text" | "multiline" | "percent" | "money"
  default: string
}

export interface OutputField {
  name: string
}

export interface CalculationResult {
  [k: string]: CalculationValue
}

export type CalculationValue = string | { errorCode: string }
