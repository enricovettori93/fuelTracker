export interface Car {
  id: string
  model: string
  selected: boolean
  initialKm: number
  createdAt: Date
}

export type AddCar = Pick<Car, "model" | "initialKm" | "createdAt" | "selected">