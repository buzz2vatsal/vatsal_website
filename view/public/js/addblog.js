let newEditor;
let tagsAdded = false;
DecoupledDocumentEditor
    .create(document.querySelector('#editor'))
    .then(editor => {
        newEditor = editor;
        const toolbarContainer = document.querySelector('#toolbar-container');
        toolbarContainer.appendChild(editor.ui.view.toolbar.element);
    })
    .catch(error => {
        console.error(error);
    });
function handleIt() {
    if (!tagsAdded) {
        console.log('2222');
        // console.log(CKEDITOR.instances.editor1.getData(), 'ccc');
        console.log(document.forms["blogForm"]["imageCaption"], 'imag');
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
        if (!tagarrary.length) {
            alert("Tage must be filled out");
            isreturn = true;
        }
        console.log(tagarrary, 'blogtags');
        if (isreturn) {
            alert("Please fill all required field");
            return;
        }
        else {
            addBlogApi(
                {
                    thumbnail_image: 'https://reactjs.org/logo-og.png',
                    image_caption: imageCaption,
                    alt_text: altText,
                    title: title,
                    sub_title: subTitle,
                    content: editorData,
                    tags: tagarrary,
                    special_mention: specialMention,
                    is_blog: 1,
                    sequence: sequence
                }
            );
        }
    } else {
        tagsAdded = false;
    }
}

APIURL = 'https://oi7nrcfmd6.execute-api.ap-south-1.amazonaws.com';
// APIURL = 'http://localhost:3000';                                        
const addBlogApi = async (apiData) => {
    const response = await fetch(`${APIURL}/addblog`, {
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
    if (apiResponse) {
        window.location.href = window.location.origin + '/blog.html';
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
    tagsAdded = true;
    console.log(tagelement.value)
    if (!tagarrary.includes(tagelement.value)) {
        tagarrary.push(tagelement.value)
        tagelement.value = " "
        console.log(tagarrary)
    }

}