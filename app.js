const list = document.querySelector('#todo-list')
const todoForm = document.querySelector('#add-todo-form')

/*
db.collection('Todos').orderBy('name').get().then((snapshot)=>{
	snapshot.docs.forEach( doc => {
		renderList(doc)
	})
})
*/
const renderList = (doc) => {
	let todo = document.createElement('li');
	let name = document.createElement('span')
	let workName = document.createElement('span')
	let workingTime = document.createElement('span')
	let cross = document.createElement('div')
	
	todo.setAttribute('data-id',doc.id)

	name.textContent = doc.data().name
	workName.textContent = doc.data().work
	workingTime.textContent = doc.data().workingtime
	cross.textContent= 'X'
	todo.appendChild(name)
	todo.appendChild(workName)
	todo.appendChild(workingTime)
	todo.appendChild(cross)
	
	list.appendChild(todo)
	
	cross.addEventListener('click', (e) =>{
	//e.stopPropagation()
	let id = e.target.parentElement.getAttribute('data-id')
	db.collection('Todos').doc(id).delete()
} )
	
}

//real-time listener
db.collection('Todos').orderBy('name').onSnapshot(snapshot => {
	let changes = snapshot.docChanges()
	changes.forEach( (change) => {
		if(change.type == 'added'){
			renderList(change.doc)
		}else if(change.type =='removed'){
		let li = list.querySelector('[data-id=' + change.doc.id + ']')
		list.removeChild(li)
		}
	})
})


todoForm.addEventListener('submit',(ev) => {
	ev.preventDefault()
	db.collection('Todos').add({
		name:todoForm.name.value,
		work:todoForm.work.value,
		workingtime:todoForm.workingtime.value
	})
	todoForm.name.value = ""
	todoForm.work.value = ""
	todoForm.workingtime.value = ""
})