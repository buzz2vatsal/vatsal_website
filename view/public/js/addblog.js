let newEditor ;
DecoupledEditor
.create(document.querySelector('#editor'))
.then(editor => {
    newEditor  = editor;
    const toolbarContainer = document.querySelector('#toolbar-container');
    toolbarContainer.appendChild(editor.ui.view.toolbar.element);
})
.catch(error => {
    console.error(error);
});
function handleIt() {
    // console.log(CKEDITOR.instances.editor1.getData(), 'ccc');
    console.log(document.forms["blogForm"]["imageCaption"]);
    const title = document.forms["blogForm"]["title"].value;
    const blogtags = document.forms["blogForm"]["tag"].value;
    const altText = document.forms["blogForm"]["altText"].value;
    const imageCaption = document.forms["blogForm"]["imageCaption"].value;
    const subTitle = document.forms["blogForm"]["subTitle"].value;
    const specialMention = document.forms["blogForm"]["specialMention"].value;
    const sequence = document.forms["blogForm"]["sequence"].value;
    // const editor = document.forms["blogForm"]["editor"].value;
    console.log(newEditor, 'newEditor');
    const editorData = newEditor.getData();
    console.log(editorData, 'editorData');
    let isreturn = false
    if (title == ""
        || imageCaption == ""
        || altText == ""
        || subTitle == ""
        || specialMention == ""
        || sequence == "") {
        isreturn = true;
    }
    // if (blogtags == "") {
    //     alert("Tage must be filled out");
    //     isreturn = true;
    // }
    if (isreturn) {
        alert("Please fill all required field");
        return true;
    }
    else {
        // console.log(editor, 'editor');
        console.log(
            {
                        thumbnail_image: 'https://reactjs.org/logo-og.png',
                        image_caption: imageCaption,
                        alt_text: altText,
                        title: title,
                        sub_title: subTitle,
                        // content text,
                        special_mention: specialMention,
                        is_blog: true,
                        sequence: sequence
                    }
        );
        addBlogApi(
            {
                thumbnail_image: 'https://reactjs.org/logo-og.png',
                image_caption: imageCaption,
                alt_text: altText,
                title: title,
                sub_title: subTitle,
                content: editorData,
                special_mention: specialMention,
                is_blog: true,
                sequence: sequence
            }
        );
    }

}

APIURL = 'https://oi7nrcfmd6.execute-api.ap-south-1.amazonaws.com';
// APIURL = 'http://localhost:3000';                                        
const addBlogApi = async (apiData) => {
    const response = await fetch(`${APIURL}/addblog`,{
        method: 'POST',
        body: JSON.stringify(apiData)
        // headers:{
        //     'Access-Control-Allow-Headers': 'Content-Type',
        //     'Access-Control-Allow-Credentials': false,
        //     'Access-Control-Allow-Origin': '*'
        // }
    });
    const apiResponse = await response.json();
    console.log(apiResponse, 'api respp');
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