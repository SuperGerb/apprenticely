//This function makes an element into a drag and drop zone for file uploads, and accepts a callback function.
//Based on http://bitwiser.in/2015/08/08/creating-dropzone-for-drag-drop-file.html
//I modified it to be able to accept additional files. (It pushes additional files onto the files array instead of replacing it each time.)

export function makeDroppable(element, inputName, callback) {
    //A variable to contain an object containing the chosen files: 
    var files = [];
    //Create the hidden file input inside the drop zone:
    let input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('multiple', true);
    input.setAttribute('name', inputName);
    input.setAttribute('id', inputName);
    input.style.display = 'none';
    input.addEventListener('change', triggerCallback);

    element.appendChild(input);
    element.addEventListener('dragover', function (e) {
        e.preventDefault();
        e.stopPropagation();
        //Add a class which will be styled to indicate that the element can accept files:
        element.classList.add('dragover');
    });
    element.addEventListener('dragleave', function (e) {
        e.preventDefault();
        e.stopPropagation();
        //Remove the special styling when on dragleave:
        element.classList.remove('dragover');
    });
    element.addEventListener('drop', function (e) {
        e.preventDefault();
        e.stopPropagation();
        element.classList.remove('dragover');
        element.classList.add('contains-file');
        triggerCallback(e);
    });
    //To enable the user to add files via the file chooser instead of by dragging and dropping, cause a click in the drag and drop zone to trigger a click of the hidden file input element (thereby opening the file chooser):
    element.addEventListener('click', function () {
        input.value = null;
        input.click();
    });

    function triggerCallback(event) {
        //Check if the event that called this function has a dataTransfer object. If it does, it means the files were selected by dropping them on an element. If not, they were selected through the file chooser window. In either case, push loop through the FileList and push each file onto the files array:
        if (event.dataTransfer) {
            let listOfFiles = event.dataTransfer.files;
            let fileListLength = listOfFiles.length;
            for(let i = 0; i < fileListLength; i++){
                files.push(listOfFiles[i]);
            }
        } else if (event.target) {
            let listOfFiles = event.target.files;
            let fileListLength = listOfFiles.length;
            for(let i = 0; i < fileListLength; i++){
                files.push(listOfFiles[i]);
            }
        }
        //Pass the files variable to the callback function provided. The call() method calls a function with a given this value and arguments provided individually:
        callback.call(null, files);
    }
}

//To do: add functionality for folders. Check if the dropped item is a folder, and if so extract the files so they can be uploaded