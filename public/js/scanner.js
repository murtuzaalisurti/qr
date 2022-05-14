var cameraId;
let scanner = new Html5Qrcode("reader");

function scan(){
    // This method will trigger user permissions
    Html5Qrcode.getCameras().then(devices => {
        /**
         * devices would be an array of objects of type:
         * { id: "id", label: "label" }
         */
        console.log(devices);
        if (devices && devices.length) {
            cameraId = devices[1].id;
            console.log(cameraId);
            // .. use this to start scanning.
    
            scanner.start(
                cameraId,
                {
                    fps: 10,
                    qrbox: {
                        width: 250,
                        height: 250
                    }
                },
                (decodedText, decodedResult) => {
                    document.querySelector(".res").innerHTML = `Code matched = ${decodedText} ${decodedResult}`;
                    console.log(`Code matched = ${decodedText}`, decodedResult);
                },
                (errorMessage) => {
                    console.error(`Code scan error = ${errorMessage}`);
                }
            ).catch((err) => {
                console.error(err);
            })
        }
    }).catch(err => {
        // handle err
    });

}

document.querySelector('.scan-btn').addEventListener('click', () => {
    scan();
})