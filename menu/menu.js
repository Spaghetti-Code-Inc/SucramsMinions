function InitMenu(){
    const logo = new Image();
    logo.src = "Assets/classClashLogo.png";
    const button = new Image();
    button.src = "Assets/buttonFrame.png";
    const buttonHover = new Image();
    buttonHover.src = "Assets/buttonFrameHover.png";
    const backgroundImg = new Image();
    backgroundImg.src = "Assets/deskMenuBackgroundCharacter.jpg";

    let mouseX = 0, mouseY = 0;
    let currentMenu = "main";
    let onStart = false;
    let onBack = false;

    backgroundImg.onload = function() {
        drawMenu();
    };


    function drawMenu() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT); // Clear canvas before drawing

        // Draw background image
        ctx.drawImage(backgroundImg, 0, 0, WIDTH, HEIGHT);
        //main menu
        if(currentMenu == "main"){
            ctx.drawImage(logo, WIDTH/2 - 250, 30, 500, 400);
            ctx.fillStyle = "#212f3c";
            // button x, button y, button width, button height
            if(onStart){
                ctx.drawImage(button, WIDTH/2 -100, 455, 200, 80);
                ctx.fillStyle = "white";
                ctx.font = "600 50px Courier New";
                ctx.fillText("START", WIDTH/2 - 75, 500);
            }
            else{
                ctx.drawImage(buttonHover, WIDTH/2 -100, 450, 200, 80);
                ctx.fillStyle = "white";
                ctx.font = "600 50px Courier New";
                ctx.fillText("START", WIDTH/2 - 75, 495);
            }
        }

        //game setup menu
        if(currentMenu =="setUp"){
            ctx.fillStyle = "white";
            ctx.font = "70px Arial";
            ctx.fillText("SET UP", WIDTH/2 - 120, 108);
            // button x, button y, button width, button height
            ctx.fillStyle = "#212f3c";
            ctx.fillRect(WIDTH/2 - 100, 550, 200, 80);
            ctx.fillStyle = "white";
            ctx.font = "50px Arial";
            ctx.fillText("BACK", WIDTH/2 - 60, 610);
        }
        
    }

    document.addEventListener("mousemove", (event) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;

        if(currentMenu == "main"){
            if(mouseX >= WIDTH/2 - 100 && mouseX <= WIDTH/2 - 100 + 200 && mouseY >= 450 && mouseY <= 450 + 80){
                onStart = true;
            }
            else{
                onStart = false;
            }
        }

        if(currentMenu == "setUp"){
            if(mouseX >= WIDTH/2 - 100 && mouseX <= WIDTH/2 - 100 + 200 && mouseY >= 550 && mouseY <= 550 + 80){
                onBack = true;
            }
            else{
                onBack = false;
            }
        }
    });

    document.addEventListener("click", (event) => {
        if(onStart && currentMenu == "main"){
            console.log("Start Button Clicked");
            // currentMenu = "setUp";
            onStart = false;
            setTimeout(1000);
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            MotherLoop();
        }
        if(onBack && currentMenu == "setUp"){
            console.log("Back Button Clicked");
            currentMenu = "main";
            onBack = false;
        }
    })
}
