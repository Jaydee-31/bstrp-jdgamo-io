var myCheck = document.getElementById("myCheck");
myCheck.onclick = function(){
    document.body.classList.toggle("dark-theme");
    if(document.body.classList.contains("dark-theme")){
        logo.src = "images/logo2.png";
        fb.src = "images/icons/facebook.png";
        tw.src = "images/icons/twitter.png";
        ig.src = "images/icons/instagram.png";
        tk.src = "images/icons/tiktok.png";
        yt.src = "images/icons/youtube.png";
        
    }else{
        logo.src = "images/logo.png";
        fb.src = "images/icons/facebook2.png"
        tw.src = "images/icons/twitter2.png";
        ig.src = "images/icons/instagram2.png";
        tk.src = "images/icons/tiktok2.png";
        yt.src = "images/icons/youtube2.png";
    }
}