const TodoList = (()=>{
    const renderProjectInput = () => {
        const inputDiv = document.getElementById("input-div")
        inputDiv.innerHTML += `
        <div data-bs-hover-animate="pulse" style="font-size: 20px;color: rgb(255,255,255);margin-left: -15px;padding-left: 20px;">
        <div><input type="text" id="input" style="width: 120px;border-style: none;border-radius: 15px;margin-right: 10px;font-size: 12px;height: 35px;padding: 0 6px;" placeholder="Enter project name..."><i class="fa fa-check" id="check-icon" style="margin-right: 7px;color: rgb(255,193,7);"></i><i class="fa fa-remove" id="remove-icon" style="color: rgb(255,193,7);"></i></div>
        </div>
        `
    }

    const removeProjectInput = () => {
        const inputDiv = document.getElementById("input-div")
        const div = inputDiv.children[Array.from(inputDiv.children).length-1]
        inputDiv.removeChild(div)
    }

    const addProject = () => {
        const ul = document.getElementById("add-project")
        const input = document.getElementById("input").value
        ul.innerHTML+=`
        <li data-bs-hover-animate="pulse"
              style="font-size: 20px;color: rgb(255,255,255);margin-left: -15px;padding-left: 20px;"><strong>${input}</strong></li>
        `
    }

    return {renderProjectInput, removeProjectInput, addProject}
}
)();

export default TodoList