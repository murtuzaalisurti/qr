var cameraId;
let scanner = new Html5Qrcode("reader");

function scan() {
    // This method will trigger user permissions
    Html5Qrcode.getCameras()
        .then((devices) => {
            document.querySelector(".scan-btn").style = "display: none;";
            document.querySelector(".scan-btn").innerHTML =
                "Allow access to camera";

            document.querySelector("#camera").style = "";
            document.querySelector(".scan").style = "";
            /**
             * devices would be an array of objects of type:
             * { id: "id", label: "label" }
             */
            if (devices && devices.length) {
                let select = document.querySelector("#camera");

                for (let k = 0; k < devices.length; k++) {
                    let option = document.createElement("option");
                    option.value = devices[k].id;
                    option.innerHTML = devices[k].label;
                    select.appendChild(option);
                }

                document
                    .querySelector(".scan")
                    .addEventListener("click", () => {
                        cameraId = select.options[select.selectedIndex].value;
                        // .. use this to start scanning.

                        if (cameraId !== "") {
                            document.querySelector("#camera").style =
                                "display: none;";

                            scanner
                                .start(
                                    cameraId,
                                    {
                                        fps: 24,
                                        qrbox: {
                                            width: 300,
                                            height: 300,
                                        },
                                    },
                                    (decodedText, decodedResult) => {
                                        document.querySelector(
                                            ".res"
                                        ).innerText = `${decodedText}`;
                                        document.querySelector(".res").style =
                                            "";
                                        document.querySelector(
                                            ".copy-btn"
                                        ).style = "";
                                        console.log(
                                            `Code matched = ${decodedResult}`
                                        );
                                        document
                                            .querySelector(".res")
                                            .scrollIntoView({
                                                behavior: "smooth",
                                            });
                                        scanner.pause(true);
                                    },
                                    (errorMessage) => {
                                        // console.error(`Code scan error = ${errorMessage}`);
                                    }
                                )
                                .then(() => {
                                    console.log("camera started");
                                    document.querySelector(
                                        ".scan"
                                    ).disabled = true;
                                    document.querySelector(
                                        ".stop-btn"
                                    ).disabled = false;
                                    document.querySelector(".stop-btn").style =
                                        "";
                                })
                                .catch((err) => {
                                    console.error(err);
                                });
                        } else {
                            document.querySelector("#camera").focus();
                        }
                    });
            }
        })
        .catch((err) => {
            // handle err
            console.error(err);
            document.querySelector(".scan-btn").style = "";
            document.querySelector(".scan-btn").disabled = true;
            document.querySelector(".error-msg").style = "";
        });
}

document.querySelector(".scan-btn").addEventListener("click", () => {
    scan();
});

document.querySelector(".stop-btn").addEventListener("click", () => {
    stopScan();
});

document.querySelector(".copy-btn").addEventListener("click", (e) => {
    if (navigator.clipboard) {
        navigator.clipboard
            .writeText(e.target.previousElementSibling.innerText)
            .then(() => {
                e.target.innerHTML = `Copied <i class="fa-solid fa-check"></i>`;
                setTimeout(() => {
                    e.target.innerHTML = "Copy";
                }, 1500);
            })
            .catch((err) => {
                console.error(err);
                e.target.innerHTML = `Copy failed <i class="fa-solid fa-xmark"></i>`;
                setTimeout(() => {
                    e.target.innerHTML = "Copy";
                }, 1500);
            });
    } else {
        e.target.innerHTML = `Copy failed <i class="fa-solid fa-xmark"></i>`;
        setTimeout(() => {
            e.target.innerHTML = "Copy";
        }, 1500);
    }
});

function stopScan() {
    scanner
        .stop()
        .then((ignore) => {
            // QR Code scanning is stopped.
            console.log("Scan stopped");
            document.querySelector(".res").style = "display: none;";
            document.querySelector(".copy-btn").style = "display: none;";
            document.querySelector(".scan").disabled = false;
            document.querySelector(".stop-btn").disabled = true;
            document.querySelector(".stop-btn").style = "display: none";
            document.querySelector("#camera").style = "";
        })
        .catch((err) => {
            // Stop failed, handle it.
            console.log(err);
        });
}
