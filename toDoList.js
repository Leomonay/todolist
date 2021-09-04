var toDoItems=[];
 const ex1 = document.querySelector('#createdBy');
 ex1.innerHTML = ex1.innerHTML + " Leo Monay";


// Se crea el constructor de una clase que recibe
// un parámetro string con la tarea
// y un estado completo inicial siempre falso.
function ToDo (string) {
    this.description=string;
    this.complete = false;
}
// Se agrega el método completeToDo a la clase, que cambiará a true el estado completo
ToDo.prototype.completeToDo = function() {this.complete=true};

// Se crea la función buildToDo
function buildToDo(todo,index) {
  // un elemento div se asigna a una variable toDoShell
  const div = document.createElement('div');
  var toDoShell = div;
  // se asigna la clase toDoShell a la variable toDoShell
  toDoShell.className='toDoShell';
  // se crea un elemento span y se le asigna a una variable toDoText
  const span = document.createElement('span');
  var toDoText = span;
  // se asigna la descripción del elemento toDo pasado como argumento, como texto del toDoText
  toDoText.innerHTML = todo.description;
  // se asigna el index pasado como argumento como el id.
  toDoText.id = index;

    var check = document.createElement('INPUT');
    check.setAttribute("type","checkbox");
    check.id = toDoText.id;
    console.log('check.id: '+check.id)
    check.addEventListener("click", completeToDo);
    check.className='completeCheckbox';

  // si el toDo está completo, se le asigna la clase completeText
  if (todo.complete){
    toDoText.className='completeText';
    check.checked=true;
  }

  //Se asigna toDoText y el check como hijo de toDoShell
  toDoShell.appendChild(toDoText);
  toDoShell.appendChild(check);

  return toDoShell;
}


// la función buildToDos genera un nuevo array con el resultado de la función buildToDo
// aplicada a todos los items del array
function buildToDos(toDos) {
  var array=toDos.map(buildToDo);
  return array;
}

// la función displayToDos muestra los toDos en pantalla
function displayToDos() {
  // selecciona el elemento toDoContainter
  var toDoContainer = document.querySelector("#toDoContainer")
  // setea el texto de toDoContainer como un string vacío
  toDoContainer.innerHTML = "";
  // aplica la funcion buildToDos sobre el arreglo de toDos
  var builds = buildToDos(toDoItems);
  // luego, se asigna cada elemento del array como un hijo de toDoContainer
  for (let i=0;i<builds.length;i++){
    toDoContainer.appendChild(builds[i]);
  }

}
 

// La función addToDo crea un nuevo toDo con el texto del input.
function addToDo() {
  // seleccionar el input con el id 'toDoInput'
  var toDoInput = document.querySelector("#toDoInput");
  // se agrega ese texto como argumento de un nuevo toDo
  var nuevotodo = new ToDo(toDoInput.value);
  // se agrega el nuevo toDo al array toDoItems y se borra el contenido del input
  toDoItems.push(nuevotodo);
  toDoInput.value="";
  // se actualiza la lista mostrada ejecutando la función displayToDos
  displayToDos();
}

// al botón con el id 'addButton' le agregamos un eventListener para que ejecute la función addToDo.
const boton = document.querySelector('#addButton');
boton.addEventListener ("click", addToDo);

function completeToDo(event) {
  // establece el index del toDo completado
  console.log(event);
  const index = event.target.id;
  // se ejecuta el método 'completeTodo' en el elemento del index del arreglo toDoItems
  toDoItems[index].completeToDo();
  // se actualiza la lista mostrada de toDos
  displayToDos();
}

displayToDos();

if (typeof module !== 'undefined') {
  module.exports = {
    toDoItems: toDoItems,
    ToDo: ToDo,
    buildToDos: buildToDos,
    buildToDo: buildToDo,
    completeToDo: completeToDo,
    displayToDos: displayToDos,
    addToDo: addToDo
  };
}