const   cards = document.querySelector(".cards");
const category = document.querySelector(".category");
const categorySpan = document.querySelectorAll(".category span");


const urlA = "https://newsapi.org/v2/top-headlines?country=in&apiKey=57c5669bfe964c269af1cfd8c0aae96d";
const urlB = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=57c5669bfe964c269af1cfd8c0aae96d";
const urlH = "https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=57c5669bfe964c269af1cfd8c0aae96d";
const urlT = "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=57c5669bfe964c269af1cfd8c0aae96d";
const urlS = "https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=57c5669bfe964c269af1cfd8c0aae96d";

const backupImage = "https://images.unsplash.com/photo-1645626610957-2968656ace38?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";


async function dataRequest(url){
    try{
        const response = await fetch(url);
        const json = response.json();
        return json;
    }
    catch(error){
        console.log(error);
    }
}

function urlRequest(url){
    
    dataRequest(url).then(data => {
        data.articles.forEach(items => {
            cards.innerHTML += `<div class="card">
                                    <div class="image">
                                    <img src="${items.urlToImage ? items.urlToImage : backupImage  }" alt="Default News image">
                                    </div>
                                    <div class="information">
                                    <div>
                                        <p class="title">${items.title}</p> 
                                        <p class="decription">${items.description}</p>
                                        <p class="time">
                                            <span>${items.publishedAt.replace("Z", "").split("T")[1]}</span>
                                            <span>${items.publishedAt.replace("Z", "").split("T")[0]}</span>
                                        </p>  
                                    </div>
                                    <div class="other">
                                        <span class="source">${items.source.name}</span>
                                        <a class="url" href="${items.url}" target="_blank">Read Article <i class="bi bi-arrow-right"></i></a>
                                    </div>
                                    </div>
                                </div>`;
        });
    
    });
}

category.addEventListener("click", event => {
    if(event.target.tagName === "SPAN"){
        cards.innerHTML = "";
        urlRequest(event.target.dataset.id);
        categorySpan.forEach(items => items.classList.remove("active"));
        event.target.classList.add("active");
    }
});

urlRequest(urlA);