export interface Car {
  id: string
  model: string
  initialKm: number
  createdAt: Date
}

export type AddCar = Pick<Car, "model" | "initialKm" | "createdAt">