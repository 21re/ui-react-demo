import { Address } from "./address";

export interface UserInput {
  refurbished: boolean
  premium: boolean
  first_occupancy: boolean
  balcony: boolean
  built_in_kitchen: boolean
  garden: boolean
  basement: boolean
  elevator: boolean
  heating_in_floor: boolean
  parquet_floor: boolean
  year_of_construction: number
  area: number
  floor_attic: boolean
  floor_ground: boolean
  plot_area: number
  object_is_house: boolean
  in_need_of_renovation: boolean
}

export interface ValuationRequest {
  userInput: UserInput
  address: Address
}

export interface ValuationResult {
  sale_sqm: number
}
