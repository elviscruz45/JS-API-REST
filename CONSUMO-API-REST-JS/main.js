console.log("Hello World")

const API_URL="https://api.thecatapi.com/v1/images/search?limit=3&live_YILlQqExhscozkRUCurw9wg00ifwOEVPAuBaxlwVaM3Js2QeS11Q2dtfsu55ey7W"

/*
fetch(URL)
    .then(rest=>rest.json())
    .then(data=>{
        const img=document.querySelector("img");
        img.src=data[0].url;
    })
*/


async function reload(){
    const rest= await fetch(API_URL);
    const data= await rest.json();
    console.log(data)

    const img1=document.getElementById("imagen1");
    img1.src=data[0].url
    const img2=document.getElementById("imagen2");
    img2.src=data[1].url
    const img3=document.getElementById("imagen3");
    img3.src=data[2].url
}

reload()