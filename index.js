$("#changeMode, #changeModeBtn").click(function(){
    $("body").toggleClass("dark-mode");

    const isDark = $("body").hasClass("dark-mode");
    
    if (isDark) {
        $("#chnageModeBtn, h1").text("Dark Mode");
    } else{
        $("#chnageModeBtn, h1").text("Light Mode");
    }
});