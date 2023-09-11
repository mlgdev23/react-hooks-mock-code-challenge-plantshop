import React, { useState, useEffect } from "react"
import NewPlantForm from "./NewPlantForm"
import PlantList from "./PlantList"
import Search from "./Search"

function PlantPage() {
   const [plants, setPlants] = useState([])
   const [searchTerm, setSearchTerm] = useState("")

   useEffect(() => {
      fetch("http://localhost:6001/plants")
         .then(r => r.json())
         .then(setPlants)
   }, [])

   function handleAddPlant(newPlant) {
      setPlants([...plants, newPlant])
   }

   function handleUpdatedPlant(updatedPlant) {
      const updatedPlants = plants.map(plant => {
         if (plant.id === updatedPlant.id) {
            return updatedPlant
         } else {
            return plant
         }
      })
      setPlants(updatedPlants)
   }

   function handleDeletePlant(id) {
      const filteredPlants = plants.filter(plant => plant.id !== id)
      setPlants(filteredPlants)
   }

   const filteredPlants = plants.filter(plant =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase())
   )

   return (
      <main>
         <NewPlantForm onAddPlant={handleAddPlant} />
         <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
         <PlantList
            plants={filteredPlants}
            onUpdatePlant={handleUpdatedPlant}
            onDeletePlant={handleDeletePlant}
         />
      </main>
   )
}

export default PlantPage
