export let popupp = function(){
	let templete = `
		<div id='popupp' class='popupp'>
			<button onclick='this.parentElement.classList.remove("active")' 
					class='popupp__close'>
			</button>
			<p>Краткое описание</p>
			<p><input type='text'/></p>
			<p class='popupp__error'></p>
			<button class='popupp__send'>
				Создать
			</button>
		</div>
	`
	document.body.innerHTML += templete;
}

