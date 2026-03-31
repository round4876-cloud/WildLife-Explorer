// Humne 'export' hata diya taake Browser ise as a regular script load kar sake
let animals = [
    { id: 1, name: "Bengal Tiger", category: "Mammal", population: 3890, image: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=800" },
    { id: 2, name: "African Elephant", category: "Mammal", population: 415000, image: "https://images.unsplash.com/photo-1557008075-7f2c5efa4cfd?w=800" },
    { id: 3, name: "Bald Eagle", category: "Bird", population: 70600, image: "https://images.unsplash.com/photo-1513267048331-5611cad62e41?w=800" },
    { id: 4, name: "Snow Leopard", category: "Mammal", population: 4000, image: "https://images.unsplash.com/photo-1534193539102-21448667c480?w=800" },
];

// Local Storage Check: Agar pehle se data save hai toh wahi load ho
if (localStorage.getItem("localAnimals")) {
    animals = JSON.parse(localStorage.getItem("localAnimals"));
}