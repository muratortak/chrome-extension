const article = document.querySelector("article");
// call api
let result = httpGet("https://restcountries.com/v3.1/all");

if(article){
    const text = article.textContent;
    const wordMatchRegExp = /[^\s]+/g;
    const words = text.matchAll(wordMatchRegExp);

    const wordCount = [...words].length;
    const readingTime = Math.round(wordCount/200);
    const badge = document.createElement("p");
    badge.classList.add("color-secondary-text", "type--caption");
    console.log(text);
    var body = document.querySelector("body");
    var parsedDoc = readable(document);
    console.log("parsed main content: ", parsedDoc.content);
    body.innerHTML = parsedDoc.content;
    // httpFetch().then(x => {
    //     badge.textContent = `${x} min read`;
    // })
    
    const heading = article.querySelector("h1");
    const date = article.querySelector("time")?.parentNode;
    (date??heading).insertAdjacentElement("afterend", badge);
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function httpFetch() {
    return fetch('https://api.openai.com/v1/completions', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': ''
        },
        body: JSON.stringify({
            prompt: `simplify the following content for A1 English level reader: ${article}`,
            model: 'text-davinci-003',
            max_tokens: 76,
            n: 0.6,
            stop: 'None'
        })
    })
    .then(response => console.log(response.json))
    .then(data => {console.log(data.choices[0].text); data.choices[0].text})
}

function readable(doc) {
    var reader = new Readability(doc);
    let article = reader.parse();
    console.log("Parsed it: ", article);
    return article;
}

