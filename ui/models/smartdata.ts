import { Address } from "./address";

export interface Level0Data {
  cellId: number
  cellSaleML: CellData
  cellSaleCP: CellData
  cellRentML: CellData
  cellRentCP: CellData
  cellMultiplierML: CellData
  cellMultiplierCP: CellData
  cellGrossInitialYieldML: CellData
  cellGrossInitialYieldCP: CellData
}

export interface CellData {
  upper: number
  lower: number
  mean: number
}

export interface SmartdataResult {
  address: Address
  level0: Level0Data
}
