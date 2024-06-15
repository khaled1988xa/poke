class Task{
    constructor(title, description, dueDate, priority,){
        this.title = title;
        this.description = description;
        this.dueDate =  new Date(dueDate);
        this.priority = priority;
    }
    getsummary(){
        return `${this.title} - ${this.dueDate} - ${this.priority}`
    }
}
class taskmanger{
    constructor(){
        this.tasks = [];
    }
    addtask(task){
        if(this.tasks.find(task => task.title === task.title)) {
            console.log('Task already exists');
        } 
        else {
        this.tasks.push(task);
    }
}
    removetask(task){
        this.tasks=this.tasks.filter(task => task.title!== task.title);
    }
    findtask(task){
        const task = this.tasks.find(task => task.title === task.title);
        return task ? task.getsummary() :"task not found";
    }
    listtasks(){
        this.tasks.forEach(task => {
            console.log(task.getsummary());
        });
    }
    listtasksbypriority(priority){
         const filterdtasks=this.tasks.filter(task => task.priority === priority);
         filterdtasks.forEach(task =>{
            console.log(task.getsummary());
         });
    }
    listtasksbyduedate(duedate){
        if(duedate===Date.now){
            this.tasks.filter(task => task.dueDate === duedate);
        }
        else {
            console.log('Invalid date');
        }
    }
}