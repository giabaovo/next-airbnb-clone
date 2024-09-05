interface Listing {
  id: string
  title: string
  description: string
  price_per_night: number
  bedrooms: number
  bathrooms: number
  guests: number
  image: string
  location: Location
  landlord: User
  category: string
  created_at: string
}

interface Location {
  label: string
  value: string
}
