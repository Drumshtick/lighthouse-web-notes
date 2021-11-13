class Employee {
  constructor(name, title, salary) {
    this.name = name;
    this.title = title;
    this.salary = salary;
    this.boss = null;
    this.subordinates = [];
  }
  addSubordinate(subordinate) {
    this.subordinates.push(subordinate);
    subordinate.boss = this;
  }
  get numberOfSubordinates() {
    return this.subordinates.length;
  }
  get numberOfPeopleToCEO() {
    let numberOfPeople = 0;
    let currentEmployee = this;

    // climb "up" the tree (using iteration), counting nodes, until no boss is found
    while (currentEmployee.boss) {
      currentEmployee = currentEmployee.boss;
      numberOfPeople++;
    }

    return numberOfPeople;
  }
  hasSameBoss(employee) {
    return this.boss === employee.boss;
  }

  employeesThatMakeOver(amount) {

    let employees = []; // 1

    if (this.salary > amount) {
      employees.push(this); // 2
    }

    for (const subordinate of this.subordinates) {
      const subordinatesThatMakeOver = subordinate.employeesThatMakeOver(amount); // 3
      employees = employees.concat(subordinatesThatMakeOver);
    }

    return employees;
  }

  get totalEmployees() {
    let totalEmployees = 0; // 1
    totalEmployees += this.subordinates.length;
    // Use depth first traversal to calculate the total employees
    for (const subordinate of this.subordinates) {
      totalEmployees += subordinate.totalEmployees;
    }
    return totalEmployees;
  }
}
// This will create a new employee called Ada who will be the CEO. Ada will be our root node.
const ada = new Employee("Ada", "CEO", 3000000.00);
// the employees directly below Ada:
const craig = new Employee("Craig", "VP Software", 1000000);
craig.boss = ada;
const arvinder = new Employee("Arvinder", "Chief Design Officer", 1000000);
arvinder.boss = ada;
const angela = new Employee("Angela", "VP Retail", 1000000);
angela.boss = ada;
const phil = new Employee("Phil", "VP Marketing", 1000000);
phil.boss = ada;

// Now we can start linking up the nodes.
ada.addSubordinate(craig);
ada.addSubordinate(arvinder);
ada.addSubordinate(angela);
ada.addSubordinate(phil);

// Craig subordinates
const simone = new Employee('Simone', 'Software');
simone.boss = craig;
const ali = new Employee('Ali', 'Software');
ali.boss = craig;
// Link employees
craig.addSubordinate(simone);
craig.addSubordinate(ali);

// Phil subordinates
const florida = new Employee('Florida', 'Marketing');
florida.boss = phil;
const david = new Employee('David', 'Marketing');
david.boss = phil;
const brian = new Employee('Brian', 'Marketing');
brian.boss = phil;
// Link employees
phil.addSubordinate(florida);
phil.addSubordinate(david);
phil.addSubordinate(brian);


// Angela subordinates
const karla = new Employee('Karla', 'Retail');
karla.boss = angela;
//Link employees
angela.addSubordinate(karla);

// Validation
// console.log("Craig's boss is: ", craig.boss);

// console.log("Craig's num of subordinates: ", craig.numberOfSubordinates);

// console.log("Num of people between Craig and CEO: ", craig.numberOfPeopleToCEO);

console.log("Total employees: ", ada.totalEmployees + 1);

console.log("Employees Under Craig: ", craig.totalEmployees + 1);