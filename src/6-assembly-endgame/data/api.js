export function getWords () {
    return fetch('https://api.datamuse.com/words?sp=*????&md=f')
    .then(response => response.json())
    .then(data => {
        console.log('Datamuse response:', data);
        return data;
    })
    .catch(error => {
        console.error('Error fetching from Datamuse:', error);
        return error;
    });
}
