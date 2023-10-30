// // Function to show a preview of the uploaded image
// function showImagePreview(inputElement, imagePreviewElement) {
//     const file = inputElement.files[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function (event) {
//             imagePreviewElement.src = event.target.result;
//             imagePreviewElement.style.display = 'block';
//         };
//         reader.readAsDataURL(file);
//     } else {
//         imagePreviewElement.style.display = 'none';
//     }
// }

// // Attach an event listener to the input element for showing the image preview
// function attachImageInputListener(inputElement, imagePreviewElement) {
//     inputElement.addEventListener('change', function () {
//         showImagePreview(inputElement, imagePreviewElement);
//     });
// }

document.addEventListener('DOMContentLoaded', function () {
    const imageInput = document.getElementById('imageInput');
    const imageInput2 = document.getElementById('imageInput2');
    const uploadButton = document.getElementById('uploadButton');
    const uploadButton2 = document.getElementById('uploadButton2');
    const originalImagePreview = document.getElementById('originalImagePreview');
    const encryptedImage = document.getElementById('encryptedImage');
    const downloadEncryptedLink = document.getElementById('downloadEncryptedLink');                               
    const decryptedImage = document.getElementById('decryptedImage');                                             
    const downloadDecryptedLink = document.getElementById('downloadDecryptedLink');
    const encryptButton = document.getElementById('encryptButton');
    const decryptButton = document.getElementById('decryptButton');
    const decryptionKeyInput = document.getElementById('decryptionKey');

    // let encryptionKey = null;                                                                                     

    // Function to show a preview of the uploaded image
    function showOriginalImagePreview(file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            originalImagePreview.src = event.target.result;
            originalImagePreview.style.display = 'block';
        };
    reader.readAsDataURL(file);
    }

    if(uploadButton){                                                                                            // Change made by Sayan - 4 (If statement added)
        uploadButton.addEventListener('click', function () {
            // Trigger the hidden file input element to allow the user to select an image for encryption
            imageInput.click();
        });
    }


    if(imageInput){                                                                                              // Change made by Sayan - 5 (If statement added)
        imageInput.addEventListener('change', function () {
            if (imageInput.files.length > 0) {
                showOriginalImagePreview(imageInput.files[0]);
            } else {
                originalImagePreview.style.display = 'none';
            }
        });
    }

    // Function to encrypt the image using XOR operation
    function encryptImage(imageData, key) {
        let encryptedData = new Uint8Array(imageData.length);                                                    
        for (let i = 0; i < imageData.length; i++) {
            encryptedData[i] = imageData[i] ^ key;
        }
        return encryptedData;
    }

    // Function to decrypt the image using XOR operation
    function decryptImage(encryptedData, key) {
        return encryptImage(encryptedData, key); // XOR is its own inverse
    }

    // Function to show a preview of the uploaded image
    // function showOriginalImagePreview(file) {
    //     const reader = new FileReader();
    //     reader.onload = function (event) {
    //         originalImagePreview.src = event.target.result;
    //         originalImagePreview.style.display = 'block';
    //     };
    //     reader.readAsDataURL(file);
    // }

    // imageInput.addEventListener('change', function () {
    //     if (imageInput.files.length > 0) {
    //         showOriginalImagePreview(imageInput.files[0]);
    //     } else {
    //         originalImagePreview.style.display = 'none';
    //     }
    // });

    if(encryptButton){                                                                                       // Change made by Sayan - 7 (If statement added)
        encryptButton.addEventListener('click', function () {
            if (imageInput.files.length === 0) {
                alert('Please select an image to encrypt.');
                return;
            }
    
            const file = imageInput.files[0];
            const reader = new FileReader();
    
            reader.onload = function (event) {
                const imageData = new Uint8Array(event.target.result);
    
                // Generate a random encryption key (between 0 and 255)
                const encryptionKey = Math.floor(Math.random() * 256);
    
                // Display the encryption key
                alert(`Encryption Key: ${encryptionKey}`);
                
                const downloadEncryptedLink = document.getElementById('downloadEncryptedLink');             // Change made by Sayan - 8 (Declared const inside block)
                const encryptedData = encryptImage(imageData, encryptionKey);
                const encryptedBlob = new Blob([encryptedData], { type: file.type });
                // const encryptedBlob = new Blob([new Uint8Array(encryptedData.buffer)], { type: file.type });
                downloadEncryptedLink.href = URL.createObjectURL(encryptedBlob);
                downloadEncryptedLink.style.display = 'block';
                // const encryptedData = encryptImage(imageData, encryptionKey);
                // encryptedImage.src = URL.createObjectURL(new Blob([encryptedData], { type: file.type }));
                // encryptedImage.style.display = 'block';
                // downloadEncryptedLink.href = URL.createObjectURL(encryptedBlob);
                // downloadEncryptedLink.style.display = 'block';
    
                // if (decryptedImage.style.display === 'block') {
                //     decryptedImage.style.display = 'none';
                //     downloadDecryptedLink.style.display = 'none';
                // }
            };
    
            reader.readAsArrayBuffer(file);
        });
    }

    if(uploadButton2){                                                                                        // Change made by Sayan - 9 (If statement added)
        uploadButton2.addEventListener('click', function () {                                                      
            // Trigger the hidden file input element to allow the user to select an image for decryption
            imageInput2.click();
        });
    }

    if(decryptButton){                                                                                         // Change made by Sayan - 10 (If statement added)
        decryptButton.addEventListener('click', function () {
            if (decryptionKeyInput === null) {
                alert('Please encrypt an image first to generate the key.');
                return;
            }
    
            if (imageInput2.files.length === 0) {                                                              // Change made by Sayan - 11 (imageInput -> imageInput2)
                alert('Please select an image to decrypt.');
                return;
            }
    
            const file = imageInput2.files[0];                                                                 // Change made by Sayan - 12 (imageInput -> imageInput2)
            const reader = new FileReader();
    
            reader.onload = function (event) {
                // const decryptedImage = document.getElementById('decryptedImage');                              // Change made by Sayan - 13 (Declared const inside block)
                const imageData = new Uint8Array(event.target.result);
                const decryptionKey = parseInt(decryptionKeyInput.value, 10);
                const decryptedData = decryptImage(imageData, decryptionKey);
                decryptedImage.src = URL.createObjectURL(new Blob([decryptedData], { type: file.type }));
                // decryptedImage.src = URL.createObjectURL(new Blob([new Uint8Array(decryptedData.buffer)], { type: file.type }));
                decryptedImage.style.display = 'block';
                downloadDecryptedLink.href = URL.createObjectURL(new Blob([decryptedData], { type: file.type }));
                downloadDecryptedLink.href = URL.createObjectURL(new Blob([new Uint8Array(decryptedData.buffer)], { type: file.type }));
                downloadDecryptedLink.style.display = 'block';
    
                if (encryptedImage.style.display === 'block') {
                    encryptedImage.style.display = 'none';
                    downloadEncryptedLink.style.display = 'none';
                }
            };
    
            reader.readAsArrayBuffer(file);
        });
    }
});