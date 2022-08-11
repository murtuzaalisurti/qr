let btn = document.querySelector(".button");
let qr_code_element = document.querySelector(".qr-code");

btn.addEventListener("click", () => {
    let user_input = document.querySelector("#input_text");
    if (user_input.value != "") {
        if (qr_code_element.childElementCount == 0) {
            generate(user_input);
        } else {
            qr_code_element.innerHTML = "";
            generate(user_input);
        }
    } else {
        document.querySelector(".error").style = "";
        document.querySelector(".error").innerHTML = "Invalid Input!";
    }
});

function generate(user_input) {
    document.querySelector(".error").style = "display: none;";

    var qrcode = new QRCode(qr_code_element, {
        text: `${user_input.value}`,
        width: 180, //128
        height: 180,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
    });

    let download = document.createElement("button");
    qr_code_element.appendChild(download);

    let download_link = document.createElement("a");
    download_link.setAttribute("download", "qr_code.png");
    download_link.innerHTML = `Download <i class="fa-solid fa-download"></i>`;

    download.appendChild(download_link);

    let qr_code_img = document.querySelector(".qr-code img");
    let qr_code_canvas = document.querySelector("canvas");

    if (qr_code_img.getAttribute("src") == null) {
        setTimeout(() => {
            download_link.setAttribute("href", `${qr_code_canvas.toDataURL()}`);
        }, 300);
    } else {
        setTimeout(() => {
            download_link.setAttribute(
                "href",
                `${qr_code_img.getAttribute("src")}`
            );
        }, 300);
    }
}

generate({
    value: "https://qr-codes.vercel.app",
});

// genrate vs scan

document.querySelectorAll(".select-section button").forEach((ele) => {
    ele.addEventListener("click", (e) => {
        document.querySelector(`.${e.target.classList[1]}-sec`).style = "";
        e.target.nextElementSibling == null
            ? (document.querySelector(
                  `.${e.target.previousElementSibling.classList[1]}-sec`
              ).style = "display: none;")
            : (document.querySelector(
                  `.${e.target.nextElementSibling.classList[1]}-sec`
              ).style = "display: none;");

        document.querySelector(`.${e.target.classList[1]}`).style =
            "border-color: #F0F4EF";
        e.target.nextElementSibling == null
            ? (document.querySelector(
                  `.${e.target.previousElementSibling.classList[1]}`
              ).style = "")
            : (document.querySelector(
                  `.${e.target.nextElementSibling.classList[1]}`
              ).style = "");
    });
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then((res) => console.log("service worker registered"))
            .catch((err) => console.log("service worker not registered", err));
    });
}
