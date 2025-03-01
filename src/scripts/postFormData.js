const formElem = document.querySelector('#formElem');
formElem.onsubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData(formElem);
    let response = await fetch('/todo/items', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
    });
    let result = await response.json();
    alert(result.status);
};