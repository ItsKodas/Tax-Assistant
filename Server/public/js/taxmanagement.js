//? Variables



//? Functions

function fetchTax(folder) {
	return new Promise((resolve, reject) => {
		fetch(`/api/taxlist?folder=${folder}`)
			.then(res => res.json()).then(json => resolve(json))
			.catch(err => reject(err))
	})
}


function test() {
	$("#TaxTable").append('Test!')
}

fetchTax(window.location.href.split('/')[4])
	.then(json =>)