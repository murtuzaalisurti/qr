var cameraId;
let scanner = new Html5Qrcode("reader");

function scan(){
    // This method will trigger user permissions
    Html5Qrcode.getCameras().then(devices => {
        /**
         * devices would be an array of objects of type:
         * { id: "id", label: "label" }
         */
         if (devices && devices.length) {
            console.log(devices);

            let select = document.querySelector("#camera");

            for(let k = 0; k < devices.length; k++) {
                let option = document.createElement('option');
                option.value = devices[k].id;
                option.innerHTML = devices[k].label;
                select.appendChild(option);
            }

            document.querySelector('.scan').addEventListener('click', () => {
                
                cameraId = select.options[select.selectedIndex].value;
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
                        // console.error(`Code scan error = ${errorMessage}`);
                    }
                ).catch((err) => {
                    console.error(err);
                })
            })
        }
        
    }).catch(err => {
        // handle err
    });

}

document.querySelector('.scan-btn').addEventListener('click', () => {
    scan();
})

document.querySelector('.stop-btn').addEventListener('click', () => {
    stopScan();
})

function stopScan() {
    scanner.stop().then((ignore) => {
        // QR Code scanning is stopped.
        console.log('Scan stopped')
      }).catch((err) => {
        // Stop failed, handle it.
        console.log(err);
      });
}