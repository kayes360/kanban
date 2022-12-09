 const draggables = document.querySelectorAll(".table_items"); 
 const boxes = document.querySelectorAll(".table_items_box"); 

 draggables.forEach(draggable =>{
    draggable.addEventListener("dragstart", ()=>{
        console.log("drag start"); 
        draggable.classList.add("dragging");
    })
    draggable.addEventListener("dragend", ()=>{
        console.log("drag end"); 
        draggable.classList.remove("dragging");
    })
});
 boxes.forEach(box =>{
    box.addEventListener("dragover", e=>{
        e.preventDefault();
        const afterElement = getDragAfterElement(box, e.clientY);
        console.log(afterElement)
        if(afterElement == null){
            box.appendChild(draggable);
        }else{
            box.insertBefore(draggable, afterElement)
        }
        const draggable = document.querySelector('.dragging');
        box.appendChild(draggable)
    })
 })
 function getDragAfterElement(box, y){
   const draggableElements = [... box.querySelectorAll('.draggable:not(.dragging)')]

   return draggableElements.reduce((closest,child)=>{
        const wrapper = child.getBoundingClientRect();
        console.log(wrapper); 
        const offset = y - wrapper.top - wrapper.height /2;
        if(offset <0 && offset>closest.offset){
            return{ offset:offset, element: child}
        }else{
            return closest
        }
   }, {offset: Number.NEGATIVE_INFINITY}).element

 }