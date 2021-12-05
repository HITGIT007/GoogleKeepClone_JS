//Here the add button 
const addButton = document.querySelector("#add");

const updateLSData = () => {
    //selecting all the textarea data
    const textAreaData = document.querySelectorAll("textarea");
    
    //creating an empty array
    const notes = [];
    console.log(textAreaData);
    
    //pushing each data in textarea to notes array
    textAreaData.forEach((note) => {
        //note contains the current value
      return notes.push(note.value);
    });
    console.log(notes);
    
    //
    localStorage.setItem("notes", JSON.stringify(notes));
  };


//When you click on add button this function will run
const addNewNote = (text = "") => {
    //The createElement() method creates an Element Node with the specified name.
    const note = document.createElement("div");//In this case it will create a div element
    
    
    //The classList property returns the class name(s) of an element, as a DOMTokenList object.
    note.classList.add("note");
    //This property is useful to add, remove and toggle CSS classes on an element.


    //Here we used template literals
    const htmlData = `
      <div class="operation">
          <button class="edit"> <i class="fas fa-edit"></i> </button>
          <button class="delete"> <i class="fas fa-trash-alt"></i> </button>
      </div>
  
      <div class="main ${text ? "" : "hidden"} "> </div>
      
      <textarea class="${text ? "hidden" : ""}"></textarea>  
      `;//If there is some text then it should be hidden and if there is no text then it will be open
    
    //The insertAdjacentHTML() method of the Element interface parses the specified text as 
    //HTML or XML and inserts the resulting nodes into the DOM tree at a specified position.  
    note.insertAdjacentHTML("afterbegin", htmlData);
    // console.log(note);
  
    // getting the References
    const editButton = note.querySelector(".edit");//contains the edit button
    const delButton = note.querySelector(".delete");//contains the delete button
    const mainDiv = note.querySelector(".main");//contains the whole div
    const textArea = note.querySelector("textarea");//contains the textarea only
  
    // deleting the node
    delButton.addEventListener("click", () => {
      note.remove();//deleting the div
      updateLSData();
    });
  
    // toggle using edit button
    textArea.value = text;
    mainDiv.innerHTML = text;
  
    editButton.addEventListener("click", () => {
      mainDiv.classList.toggle("hidden");
      textArea.classList.toggle("hidden");
    });
  
    textArea.addEventListener("change", (event) => {
      const value = event.target.value;
      mainDiv.innerHTML = value;
  
      updateLSData();
    });
  
    document.body.appendChild(note);
    // it appends a node as the last child of  a node
  };

  // getting data back from localStorage
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => addNewNote(note));
}

addButton.addEventListener("click", () => addNewNote());//Add note event listener
//Click on add note button