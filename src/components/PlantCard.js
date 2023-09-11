import React, { useState } from "react"

function PlantCard({ plant, onUpdatePlant, onDeletePlant }) {
   const { id, name, price, image, in_stock } = plant
   const [inStock, setInStock] = useState(in_stock)
   const [updatedPrice, setUpdatedPrice] = useState(0)

   function handleStockClick() {
      const configObj = {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ in_stock: !inStock }),
      }

      fetch(`http://localhost:6001/plants/${id}`, configObj)
         .then(r => r.json())
         .then(updatedPlant => {
            setInStock(updatedPlant.in_stock)
            onUpdatePlant(updatedPlant)
         })
   }

   function handlePriceChange(e) {
      const amount = e.target.value
      if (amount === "" || amount === null) {
         setUpdatedPrice("")
      } else {
         setUpdatedPrice(parseFloat(e.target.value))
      }
   }

   function handleSubmit(e) {
      e.preventDefault()

      const configObj = {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ price: updatedPrice }),
      }

      fetch(`http://localhost:6001/plants/${id}`, configObj)
         .then(r => r.json())
         .then(updatedPlant => onUpdatePlant(updatedPlant))

      setUpdatedPrice(0)
   }

   function handleDelete(params) {
      fetch(`http://localhost:6001/plants/${id}`, {
         method: "DELETE",
      }).then(onDeletePlant(id))
   }
   return (
      <li className="card">
         <img src={image} alt={name} />
         <h4>{name}</h4>
         <p>Price: ${price.toFixed(2)}</p>
         {inStock ? (
            <button className="primary" onClick={handleStockClick}>
               In Stock
            </button>
         ) : (
            <button onClick={handleStockClick}>Out of Stock</button>
         )}
         <button onClick={handleDelete}>Delete</button>
         <form onSubmit={handleSubmit}>
            <input
               type="number"
               step="0.01"
               placeholder="New Price..."
               value={updatedPrice}
               onChange={handlePriceChange}
            />
            <button type="submit">UpdatePrice</button>
         </form>
      </li>
   )
}

export default PlantCard
