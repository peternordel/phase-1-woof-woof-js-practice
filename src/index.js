const BASE_URL = 'http://localhost:3000/pups';
let goodDogButtonOn = false;

document.addEventListener('DOMContentLoaded', () => {
    goodDogButton();
    fetchData();
})

function fetchData() {
    fetch(BASE_URL)
    .then(resp => resp.json())
    .then(data => renderMenu(data));
}

function renderMenu(dogs) {
    const dogBar = document.getElementById('dog-bar');
    dogBar.replaceChildren();
    for (const dog of dogs) {
        const spanBar = document.createElement('span');

        spanBar.textContent = dog.name;
        spanBar.addEventListener('click', e => {
            e.preventDefault();
            display(dog);
        });

        if(goodDogButtonOn) {
            if(dog.isGoodDog) {
                dogBar.append(spanBar);
            }
            continue;
        } else {
            dogBar.append(spanBar);
        }
    }
}

function display(dog) {

    // an img tag with the pup's image url
    const dogImage = document.createElement('img');
    dogImage.src = dog.image;

    // an h2 with the pup's name
    const dogName = document.createElement('h2');
    dogName.textContent = dog.name;

    // a button that says "Good Dog!" or "Bad Dog!" based on whether isGoodDog is true or false.
    const dogButton = document.createElement('button');
    dogButton.textContent = dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
    dogButton.addEventListener('click', e => {
        e.preventDefault();
        dog.isGoodDog = !dog.isGoodDog;
        dogButton.textContent = dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!';

        const updateDogStatusObject = {
            isGoodDog: dog.isGoodDog
        }

        fetch(BASE_URL + `/${dog.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(updateDogStatusObject)
        })

    })

    const dogInfo = document.getElementById('dog-info');
    dogInfo.replaceChildren(dogImage, dogName, dogButton)
}

function goodDogButton() {
    const button = document.getElementById('good-dog-filter');

    button.addEventListener('click', e => {
        e.preventDefault();
        goodDogButtonOn = !goodDogButtonOn;
        button.textContent = goodDogButtonOn ? 'Filter good dogs: ON' : 'Filter good dogs: OFF';
        fetchData();
    });
}
