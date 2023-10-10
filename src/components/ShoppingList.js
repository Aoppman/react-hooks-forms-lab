import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items, onItemsUpdated }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("Search...");

  function handleCategoryChange(event) {
    console.log(event.target.value);
  }

  const itemsToDisplay = items
    .filter((item) => {
      if (selectedCategory === "All") return true;

      return item.category === selectedCategory;
    })
    .filter((item) => {
      if (search === "Search...") {
        return true;
      }

      if (item.name.toLowerCase().includes(search.toLowerCase()) === search) {
        return true;
      }
    });

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  function handleFormSubmit(newItem) {
    onItemsUpdated(newItem)
  }

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleFormSubmit}/>
      <Filter
        search={search}
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearch}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
