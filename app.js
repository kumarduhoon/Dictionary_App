let input = document.querySelector('#input');
let btn = document.querySelector('#btn');
let apiKey = '11b4f92a-17d5-4f70-8efe-871b19a86600';
let notfound = document.querySelector('.not_found');
let sug = document.querySelector(".classSug")
let def = document.querySelector('.classP')
let audioBox = document.querySelector('.audio')
let loading = document.querySelector('#span')
btn.addEventListener('click', function (e) {
    e.preventDefault();

    // empty previous data
    audioBox.innerHTML = "";
    def.innerText = "";
    notfound.innerText = "";


    // get input data
    let word = input.value

    //    call api get  data
    if (word == "") {
        let empy = document.createElement('span');
        empy.classList.add('classEmpy')
        empy.innerText ="Please enter the word";
        def.appendChild(empy);
        return;
    }
    getData(word);

});

async function getData(word) {
    loading.style.display = 'block';

    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
    const data = await response.json();
    console.log(data);
    //    if result is not found

    if (!data.length) {
        loading.style.display  = 'none';
        notfound.innerText = "No result Found";
        return;
    }


    //  if the data is suggested
    if (typeof data[0] === 'string') {
        loading.style.display = 'none';
        let heading = document.createElement('span');
        heading.classList.add('classSpan');
        heading.innerText = "Did you Know ?"
        notfound.appendChild(heading);

        // create span and print the suggested word
        data.forEach(element => {
            let suggestion = document.createElement('span');
            suggestion.classList.add('classSpan1');
            suggestion.innerText = element
            sug.appendChild(suggestion);
        });
        return;
    }

    // if result is found
    loading.style.display  = 'none';
    let result = data[0].shortdef[0];
    def.innerText = result;


    // now for get audio file from api
    let soundName = data[0].hwi.prs[0].sound.audio;
    if (soundName) {
        // if sound is available then
        renderSound(soundName);
    }
}
function renderSound(soundName) {
    let subfolder = soundName.charAt(0);
    let soundScr = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`


    let aud = document.createElement('audio');
    aud.classList.add('hello')
    aud.src = soundScr;
    aud.controls = true;
    audioBox.appendChild(aud);

}