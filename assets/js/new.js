let editor = document.querySelector('.document-editor__editable');
//console.log(editor);

DecoupledEditor
    .create(document.querySelector('.document-editor__editable'))
    .then(newEditor => {
        editor = newEditor;
    })
    .catch(error => {
        console.error(error);
    });

function prn() {
    data = editor.getData();;
    console.log(data);
}