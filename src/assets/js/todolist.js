const TodoList = (()=>{
    const renderProjectInput = () => {
        const ul = document.getElementById("add-project")
        ul.innerHTML += `
        <li data-bs-hover-animate="pulse" style="font-size: 20px;color: rgb(255,255,255);margin-left: -15px;padding-left: 20px;">
        <div><input type="text" style="width: 120px;border-style: none;border-radius: 15px;margin-right: 10px;font-size: 12px;height: 35px;padding: 0 6px;" placeholder="Enter project name..."><i class="fa fa-check" style="margin-right: 7px;color: rgb(255,193,7);"></i><i class="fa fa-remove" id="remove-icon" style="color: rgb(255,193,7);"></i></div>
        </li>
        `
    }

    const removeProjectInput = () => {
        const ul = document.getElementById("add-project")
        const li = ul.children[Array.from(ul.children).length-1]
        ul.removeChild(li)
    }

    return {renderProjectInput, removeProjectInput}
}
)();

export default TodoList