export interface Refuel {
  id: string
  actualKm: number
  quantity: number
  date: string
  createdAt: Date
  lat?: number
  lng?: number
}

export type AddRefuel = Pick<Refuel, "actualKm" | "quantity" | "date" | "lat" | "lng" | "createdAt">