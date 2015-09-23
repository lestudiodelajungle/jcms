(function () {
    "use strict";
    class Person {
        "use strict";
        constructor(firstName, lastName, age) { //constructors!
            this.firstName = firstName;
            this.lastName = lastName;
            this.age = age;
        }

        fullName() {
            console.log(this.firstName + & amp; quot; & amp; quot; + this.lastName);
        }
    }

    class Employee extends Person { //inheritance
        constructor(firstName, lastName, age, salary) {
            super(firstName, lastName, age); //call the parent constructor with super
            this.salary = salary;
        }

        printSalary() {
            console.log('Salary : ' + this.salary);
        }
    }

    let julien = new Employee('Julien', 'Roy', '33', 150000);

    julien.fullName();
    julien.printSalary();

})()
