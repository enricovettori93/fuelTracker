export interface Car {
  id: string
  model: string
  initialKm: number
}

export type AddCar = Pick<Car, "model" | "initialKm">