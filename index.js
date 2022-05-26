const express = require("express");
const app = express();
const methodOverride = require("method-override");
const path = require("path");
const { v4: uuidv4} = require("uuid");

let cars = [
	{
		img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2Fyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
		manufacturer: "Ford",
		brand: "Mustang",
		description: "I shot this while doing a job for a luxury automotive storage facility in Baltimore, MD. I wanted to create an ominous sense of intrigue, giving the feeling of a space that was both expansive and enclosed. I enjoy the journey my eyes take from the focal point of the headlamps to the contours of the Camero’s body, and then to the backdrop of stacked automobiles.",
		id: uuidv4()
	},
	{
		img: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2Fyc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
		manufacturer: "Ferrari",
		brand: "Spider",
		description: "A nice red ferrari. There are only 300 models in the entire world.",
		id: uuidv4()
	},
	{
		img: "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2Fyc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
		manufacturer: "Mercedes",
		brand: "Benz",
		description: "Mercedes Benz AMG C63S",
		id: uuidv4()
	},
	{
		img: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNhcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
		manufacturer: "Audi",
		brand: "x8",
		description: "Clean Audi meets moody forest.",
		id: uuidv4()
	},
]


app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))

// INDEX
app.get("/cars", (req,res) => {
	res.render("cars/index", {cars});
})
// NEW CAR FORM
app.get("/cars/new", (req,res) => {
	res.render("cars/new");
})
// NEW CAR POST
app.post("/cars", (req,res) => {
	const {img, manufacturer, brand, description} = req.body;
	cars.push({img, manufacturer, brand, description, id: uuidv4()})
	res.redirect("/cars");
})
// VIEW CAR DETAILS
app.get("/cars/:id", (req,res) => {
	const {id} = req.params;
	const car = cars.find(c => c.id === id)
	res.render("cars/details", {car})
})
// EDIT CAR FORM
app.get("/cars/:id/edit", (req,res) => {
	const {id} = req.params;
	const car = cars.find(c => c.id === id)
	res.render("cars/edit", {car})
})

// EDIT CAR DETAILS
app.patch("/cars/:id", (req,res) => {
	const {id} = req.params;
	let foundCar = cars.find(c => c.id === id);
	foundCar.img = req.body.img;
	foundCar.manufacturer = req.body.manufacturer;
	foundCar.brand = req.body.brand;	
	foundCar.description = req.body.description;	
	res.redirect("/cars");
})

// DELETE POST
app.delete("/cars/:id", (req,res) => {
	const {id} = req.params;
	let foundCar = cars.find(c => c.id === id);
	cars = cars.filter(c => c.id !== id);
	res.redirect("/cars")
})

app.listen("3000", () => {
	console.log("SERVER IS LISTENING ON PORT 3000")
})