const menu = {
    _courses: {
        appetizers: [],
        mains: [],
        desserts: []
    },
    get appetizers() {
        return this._courses.appetizers;
    },
    set appetizers(appetizerIn) {
        this._courses.appetizers.push(appetizerIn);
    },
    get mains() {
        return this._courses.mains;
    },
    set mains(mainsIn) {
        this._courses.mains.push(mainsIn);
    },
    get desserts() {
        return this._courses.desserts;
    },
    set desserts(dessertsIn) {
        this._courses.desserts.push(dessertsIn);
    },
    get courses() {
        return {
            appetizers: this.appetizers,
            mains: this.mains,
            desserts: this.desserts
        }
    },
    addDishToCourse(courseName, dishName, dishPrice) {
        const dish = {
            name: dishName,
            price: dishPrice
        };
        switch (courseName) {
            case 'appetizers':
                this.appetizers = dish;
                break;
            case 'mains':
                this.mains = dish;
                break;
            case 'desserts':
                this.desserts = dish;
                break;
        }
    },
    getRandomDishFromCourse(courseName) {
        const dishes = this[courseName];
        const randomIndex = Math.floor(Math.random() * dishes.length);
        return dishes[randomIndex];
    },
    generateRandomMeal() {
        let result = '';
        let mealString = '';
        let meals = [];
        let totalPrice = 0;

        for (const prop in this._courses) {
            const randomDish = this.getRandomDishFromCourse(prop);
            meals.push(randomDish);
            totalPrice += randomDish.price;
        }

        meals.forEach(meal => {
            mealString += `${meal.name}, `;
        });

        result = `Your meal is ${mealString}please enjoy. The price is $${totalPrice}.`

        return result;
    }
};

menu.addDishToCourse('appetizers', 'Chicken Wings', 5);
menu.addDishToCourse('appetizers', 'Salad', 3);
menu.addDishToCourse('appetizers', 'Potato Wedges', 4);

menu.addDishToCourse('mains', 'Steak', 24);
menu.addDishToCourse('mains', 'Pizza', 14);
menu.addDishToCourse('mains', 'Burger', 10);

menu.addDishToCourse('desserts', 'Cherry Pie', 5);
menu.addDishToCourse('desserts', 'Ice Cream', 3);
menu.addDishToCourse('desserts', 'Cake', 4);

const meal = menu.generateRandomMeal();
console.log(meal);