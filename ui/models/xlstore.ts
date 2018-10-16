import { Address } from "./address";

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
  requirements: string[]
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

export interface XLCalculationRequest {
  user: { [k: string]: string | number | boolean },
  address?: Address
}

export interface XLCalculationResult {
  appId: string
  appVersion: number
  result: { [k: string]: CalculationValue }
}

export type CalculationValue = string | number | { errorCode: string }
