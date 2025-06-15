var baseApi = "https://restcountries.com/v3.1/name/";
// real api--> https://restcountries.com/v3.1/name/{name}?fullText=true 
var countryInput = document.querySelector("#countryNameInput");
var cntDataDiv = document.querySelectorAll(".cntData");
let apiData="";

var loaderDiv = document.querySelector("#loader");
var countryDataDiv = document.querySelector("#countryData");


let cntDataObj = {
    cca2: "",
    mapsObj:"",
    googleMapLink: "",
    nameObj: "",
    name: "",
    capital: "",
    currencyObj: "",
    currencyName: "",
    currencySymbol: "",
    flagObj: "",
    flagSrc: "",
    continent: "",
    populationCount: "",
    latitude: "",
    longtitude: "",
    topLevelDomain: "",
}

async function getData(cntName = "india") {
    let countryName = cntName.replaceAll(" ", "%20");
    loaderDiv.style.opacity = "1";
    apiData = await fetch(baseApi + countryName + `?fullText=true`);
    if(apiData.ok){
        console.log("SUCCESS");
        extractData();
    }
    else{
        // console.log("fail");
        if(apiData.status==404){
        alert("Invalid country Name");
        }
        else{
            alert("Retry some Error Occured");
        }
        loaderDiv.style.opacity = "0";
    countryDataDiv.style.opacity = "0";
    }
    
}


countryInput.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        // console.log(countryInput.value);
        getData(countryInput.value);
    }
})

function displayData(){
    document.querySelector("#imgSrc").src = cntDataObj.flagSrc;         //IMAGE
    document.querySelector("#name").innerText = cntDataObj.name;        //NAME
    document.querySelector("#continent").innerText = cntDataObj.continent;           //CONTINENT
    document.querySelector("#capital").innerText = cntDataObj.capital;          //CAPITAL
    document.querySelector("#currency").innerText = cntDataObj.currencySymbol+" "+cntDataObj.currencyName;        //currency name
    document.querySelector("#population").innerText = cntDataObj.populationCount;       //population
    document.querySelector("#topLevelDomain").innerText = cntDataObj.topLevelDomain;        //top level domain
    document.querySelector("#latlng").innerText = `${cntDataObj.latitude},${cntDataObj.longtitude}`;        //LATITUDE AND LONGITUDE
    document.querySelector("#imgSrc").src = cntDataObj.flagSrc;     //img src link
    document.querySelector("#mapLink").href = cntDataObj.googleMapLink;          // GOOGLE MAP LINK
    document.querySelector("#mapLink").innerText = cntDataObj.googleMapLink;          // GOOGLE MAP LINK
    loaderDiv.style.opacity = "0";
    countryDataDiv.style.opacity = "1";
}


async function extractData(){
    console.log("apiData: ", apiData);
    const jsonFormatData = await apiData.json();
    console.log("json format data: ", jsonFormatData[0]);
    cntDataObj.cca2 = jsonFormatData[0].cca2;    
    cntDataObj.mapsObj = jsonFormatData[0].maps;    //MAPS
    cntDataObj.googleMapLink = cntDataObj.mapsObj.googleMaps;           //PROPER MAP LINK
    cntDataObj.nameObj = jsonFormatData[0].name;        //                  NAME
    cntDataObj.name = cntDataObj.nameObj.common;        //          PRORER NAME 
    cntDataObj.capital = jsonFormatData[0].capital[0];     //      CAPITAL
    cntDataObj.currencyObj = jsonFormatData[0].currencies;              //CURRENCY OBJ
    let cntCode = countryCodes[cntDataObj.cca2];
    cntDataObj.currencyName = cntDataObj.currencyObj[cntCode].name;        //CURRENCY NAME
    cntDataObj.currencySymbol = cntDataObj.currencyObj[cntCode].symbol;        //CURRENCY SYMBOL
    cntDataObj.flagObj = jsonFormatData[0].flags;           //flag obj
    cntDataObj.flagSrc = cntDataObj.flagObj['png'];         //FLAG IMG LINK
    cntDataObj.continent = jsonFormatData[0].continents[0];         //CONTINENT
    cntDataObj.populationCount = jsonFormatData[0].population;          //POPULATION
    cntDataObj.latitude = jsonFormatData[0].latlng[0];          //LATITUDE
    cntDataObj.longtitude = jsonFormatData[0].latlng[1];          //LONGITUDE
    cntDataObj.topLevelDomain = jsonFormatData[0].tld[0];           //TOP LEVEL DOMAIN
    displayData();
    
    console.log(cntDataObj);
}