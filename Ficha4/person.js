function Person (firstName, lastName){
    this.firstName = firstName,
    this.lastName = lastName
}

Person.prototype.getAge = function (age){
        this.age=age
}

Person.prototype.greet= function(){
    console.log ("Hello " + this.firstName + " " + this.lastName + " " + this.age);
}
 
var john = new Person("John", "Doe"); 
john.getAge(28);
john.greet();

var jane = new Person("Jane","Doe");
jane.getAge(28);
jane.greet();

console.log(john.__proto__);
console.log(jane.__proto__);
console.log(john.__proto__ === jane.__proto__);