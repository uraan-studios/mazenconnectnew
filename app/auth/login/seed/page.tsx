import { seedData } from '@/actions/seed'
import React from 'react'

const SeedPage = async () => {
    const seed = await seedData();


  return (
    <div>Seeded</div>
  )
}

export default SeedPage