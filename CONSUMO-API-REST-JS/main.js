console.log("Hello World")

const API_URL_RANDOM="https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_YILlQqExhscozkRUCurw9wg00ifwOEVPAuBaxlwVaM3Js2QeS11Q2dtfsu55ey7W"
const API_URL_FAVORITES="https://api.thecatapi.com/v1/favourites?limit=100&api_key=live_YILlQqExhscozkRUCurw9wg00ifwOEVPAuBaxlwVaM3Js2QeS11Q2dtfsu55ey7W"
const API_URL_FAVORITES_DELETE=(id)=>`https://api.thecatapi.com/v1/favourites/${id}?api_key=live_YILlQqExhscozkRUCurw9wg00ifwOEVPAuBaxlwVaM3Js2QeS11Q2dtfsu55ey7W`

/*
fetch(URL)
    .then(rest=>rest.json())
    .then(data=>{
        const img=document.querySelector("img");
        img.src=data[0].url;
    })
*/


const spanError=document.getElementById("error")


async function loadRandomMichis(){
    const rest= await fetch(API_URL_RANDOM);
    const data= await rest.json();
    console.log("Random")
    console.log(data)


    if (rest.status!==200){
        spanError.innerHTML="Hubo un error: "+rest.status;

    }else{
        const img1=document.getElementById("imagen1");
        const img2=document.getElementById("imagen2");
        const btn1=document.getElementById("btn1")
        const btn2=document.getElementById("btn2")

        img1.src=data[0].url
        img2.src=data[1].url

        /*
        btn1.onclick=saveFavoritesMischis(data[0].id)
        btn2.onclick=saveFavoritesMischis(data[1].id)
        */
        btn1.onclick=()=>saveFavoritesMischis(data[0].id)
        btn2.onclick=()=>saveFavoritesMischis(data[1].id)
    }
}

async function loadFavoritesMichis(){
    const rest= await fetch(API_URL_FAVORITES);
    const data= await rest.json();
    console.log("Favorites")
    console.log(data)
    if (rest.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + rest.status + data.message;
      }else{

        const section=document.getElementById("favoritesMichis")
        section.innerHTML=""
        const h2=document.createElement("h2")
        const h2Text= document.createTextNode("Michis favoritos")
        h2.appendChild(h2Text)
        section.appendChild(h2)


        data.forEach(michi=>{
            const article=document.createElement("article");
            const img=document.createElement("img")
            const btn=document.createElement("button")
            const btnText=document.createTextNode("Sacar al michi de favoritos");
            
            img.src=michi.image.url
            img.width=150

            btn.appendChild(btnText)
            btn.onclick=()=>deleteFavoritesMischis(michi.id)
            article.appendChild(img)
            article.appendChild(btn)
            section.appendChild(article)
        })
      }
}


async function saveFavoritesMischis(id){
    const rest=await fetch(API_URL_FAVORITES,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            image_id:id
        }),
    });

    const data= await rest.json();
    console.log("save")
    console.log(rest)

    if (rest.status!==200){
        spanError.innerHTML="Hubo un error: "+rest.status+data.message;
    }else{
        console.log("Michi guardado en favoritos")
        loadFavoritesMichis()

    }

    }



async function deleteFavoritesMischis(id){
    const rest=await fetch(API_URL_FAVORITES_DELETE(id),{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
        },

    });

    const data= await rest.json();


    if (rest.status!==200){
        spanError.innerHTML="Hubo un error: "+rest.status+data.message;
        

    }else{
        console.log("Michi eliminado de favoritos")
        loadFavoritesMichis()

    }
    }















loadRandomMichis()
loadFavoritesMichis()

