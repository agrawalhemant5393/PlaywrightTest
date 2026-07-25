export class Student{
    name: string
    age: number 

    constructor(name: string, age:number){
        this.name = name
        this.age = age
    }
    
    greet(courseName:String){
        console.log(`Welcome ${this.name} ! Glas to see you in this course ${courseName}` )
    }
}