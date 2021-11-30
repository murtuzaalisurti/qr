
let btn = document.querySelector(".button");

btn.addEventListener("click", () => {
    if(document.querySelector(".qr-code").childElementCount == 0){
        generate();
    } else{
        document.querySelector(".qr-code").innerHTML = "";
        generate();
    }
})

function generate(){
    document.querySelector(".qr-code").style = "";
    let input_url = document.querySelector("#url");
    var qrcode = new QRCode(document.querySelector(".qr-code"), {
        text: `${input_url.value}`,
        width: 128,
        height: 128,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    let download = document.createElement("button");
    document.querySelector(".qr-code").appendChild(download);

    let download_link = document.createElement("a");
    download_link.setAttribute("download", "qr_code.png");
    download_link.innerText = "Download";
    download.appendChild(download_link);

    setTimeout(() => {
        download_link.setAttribute("href", `${document.querySelector(".qr-code img").getAttribute("src")}`);
    }, 300);
}