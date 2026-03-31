let editId = null;

const render = (data) => {
    const container = document.getElementById("cards");
    const stats = document.getElementById("stats-pill");
    
    // Stats Logic (Reduce)
    const total = animals.reduce((acc, curr) => acc + curr.population, 0);
    stats.innerText = `DATABASE: ${animals.length} ITEMS | POP: ${total.toLocaleString()}`;

    container.innerHTML = data.map(item => {
        // --- 10 STRING METHODS (Task 6) ---
        const nameClean = item.name.trim().toUpperCase(); // 1 & 2: trim & toUpperCase
        const idPad = String(item.id).padStart(5, '0'); // 3: padStart
        const categoryLabel = "Species: ".concat(item.category); // 4: concat
        const shortDesc = "Native to the Wild Forests".substring(0, 15); // 5: substring
        const formattedPop = String(item.population).padEnd(8, ' '); // 6: padEnd
        const cleanCat = item.category.toLowerCase().replace("mammal", "Mammalian"); // 7 & 8: toLowerCase & replace
        const firstLetter = item.name.charAt(0); // 9: charAt
        const breadcrumb = item.name.slice(0, 3).repeat(1); // 10: slice & repeat

        return `
        <div class="group bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-700 border border-slate-100 dark:border-slate-700">
            <div class="relative h-60 overflow-hidden">
                <img src="${item.image || 'https://images.unsplash.com/photo-1547721064-36202335162e?w=800'}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60"></div>
                <div class="absolute top-4 left-4 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">ID: ${idPad}</div>
            </div>
            <div class="p-8">
                <h3 class="text-2xl font-black text-slate-800 dark:text-white leading-tight">${nameClean}</h3>
                <p class="text-emerald-600 text-xs font-bold uppercase tracking-widest mt-1 mb-4">${cleanCat}</p>
                
                <div class="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-2xl mb-6">
                    <p class="text-[9px] text-slate-400 uppercase font-black tracking-widest">Archive Record</p>
                    <p class="text-xl font-black text-slate-700 dark:text-emerald-400">${item.population.toLocaleString()}</p>
                </div>

                <div class="flex gap-2">
                    <button onclick="editItem(${item.id})" class="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white py-3 rounded-xl font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900 transition active:scale-95">EDIT</button>
                    <button onclick="deleteItem(${item.id})" class="flex-1 bg-red-50 dark:bg-red-900/20 text-red-500 py-3 rounded-xl font-bold hover:bg-red-500 hover:text-white transition active:scale-95 text-xs">DELETE</button>
                </div>
            </div>
        </div>`;
    }).join("");
};

// CRUD & Filters
const applyLogic = () => {
    const q = document.getElementById("search").value.toLowerCase();
    const min = Number(document.getElementById("filter-pop").value);
    const sort = document.getElementById("sort-by").value;

    let res = animals.filter(a => 
        (a.name.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)) &&
        a.population >= min
    );

    if (sort === "name") res.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "pop") res.sort((a, b) => b.population - a.population);

    render(res);
};

window.deleteItem = (id) => {
    const i = animals.findIndex(a => a.id === id);
    if(confirm("Confirm deletion of record?")) {
        animals.splice(i, 1);
        applyLogic();
    }
};

window.editItem = (id) => {
    const item = animals.find(a => a.id === id);
    document.getElementById("name").value = item.name;
    document.getElementById("category").value = item.category;
    document.getElementById("population").value = item.population;
    editId = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

document.getElementById("animal-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const d = {
        name: document.getElementById("name").value,
        category: document.getElementById("category").value,
        population: Number(document.getElementById("population").value)
    };

    if (editId) {
        const i = animals.findIndex(a => a.id === editId);
        animals[i] = { ...animals[i], ...d };
        editId = null;
    } else {
        animals.push({ id: Date.now(), ...d, image: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800" });
    }
    applyLogic();
    e.target.reset();
});

["search", "filter-pop", "sort-by"].forEach(id => {
    document.getElementById(id).addEventListener("input", applyLogic);
});

render(animals);