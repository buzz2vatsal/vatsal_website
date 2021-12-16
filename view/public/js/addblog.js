function handleIt() {
    const blogname = document.forms["blogForm"]["subject"].value;
    const blogtags = document.forms["blogForm"]["tag"].value;
    if (blogname == "") {
        alert("Subject must be filled out");
    }
    if (blogtags == "") {
        alert("Tage must be filled out");
        return false;
    }

}

const tagelement = document.getElementById("tag");
tagelement.addEventListener("keydown", function (e) {

    if (e.keyCode == 13) {
        addtotagarray();
    }
})

const tagarrary = []
function addtotagarray() {
    console.log(tagelement.value)
    if (!tagarrary.includes(tagelement.value)) {
        tagarrary.push(tagelement.value)
        tagelement.value = " "
        console.log(tagarrary)
    }

}