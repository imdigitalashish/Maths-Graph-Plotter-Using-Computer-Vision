class Main {
    constructor() {
        this.worker = new Tesseract.TesseractWorker();

        this.image = new Image();
        this.image.src = "./alt_text_example.jpg";

        this.image.onload = () => {
            console.log(this.image);
            this.canvas = document.createElement("canvas");
            document.body.appendChild(this.canvas);
            this.videoElement = document.querySelector('video');

            this.canvas.width = this.image.width;
            this.canvas.height = this.image.height;

            this.ctx = this.canvas.getContext("2d");

            this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(this.handleCameraFeed)
            // this.convertToImage();
        }


        // this.convertToImage();
        console.log("here")
    }

    handleCameraFeed = (stream) => {
        this.videoElement.srcObject = stream;

        this.videoElement.onplay = () => {

            this.canvas.height = (this.videoElement.videoHeight)
            this.canvas.width = (this.videoElement.videoWidth)
            this.videoElement.style.display = "none";
            requestAnimationFrame(this.render.bind(this));

        }


    }

    convertToImage() {
        let imageData = this.canvas.toDataURL();
        // let imageO = new Image();
        // imageO.src = imageData;
        // imageO.onload = ()=> {

        //     document.body.append(imageO)
        // }
        this.worker.recognize(imageData, "eng")
            .progress((packet) => {
                this.started = true;
                // document.querySelector(".label").innerHTML = packet.status
                console.log(packet)
            })
            .then(data => {
                this.started = false;
                document.querySelector(".label").innerHTML = data.text

                console.log(data)
            })



    }





    lasTick = Date.now();
    started = false;

    render(ts) {


        if (!this.started) {
            this.started = true;
            console.log("do");
            this.convertToImage();
            this.lasTick = Date.now();

        }


        this.ctx.drawImage(this.videoElement, 0, 0, this.canvas.width, this.canvas.height);

        requestAnimationFrame(this.render.bind(this));
    }



}


window.onload = () => {
    window.app = new Main();
}