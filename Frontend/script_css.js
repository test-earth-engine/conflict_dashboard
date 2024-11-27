export 
function createSliderStyles() 
{
    const style = document.createElement('style');
    style.textContent = `

body 
{
    margin: 0;
    background-color: black;
    color: white;
    font-family: Arial, sans-serif;
}


#buttons_b 
{
    top: 0px;
    left: 10px;
    z-index: 1;
    gap: 10px; /* Space between buttons */
    display: flex; /* Align buttons horizontally */
    position: relative; /* Position buttons based on this container */
    justify-content: flex-start; /* Align buttons to the left by default */
}


#buttons_a 
{
    top: 50px;
    left: 10px;
    z-index: 1;
    gap: 10px; /* Space between buttons */
    display: flex; /* Align buttons horizontally */
    position: relative; /* Position buttons based on this container */
    justify-content: flex-start; /* Align buttons to the left by default */
}

#button_a_play, #button_a_pause 
{
    cursor: pointer;
    padding: 5px 5px;
    font-size: 12px;
}     


.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; /* Ensure the spinner is on top of everything */
}

/* Circular spinner style */
.spinner {
    border: 8px solid #f3f3f3; /* Light gray background */
    border-top: 8px solid #4caf50; /* Green spinner */
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
}

/* Animation for spinning effect */
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}


        .slider {
            width: 100%;
            height: 10px;
            background: #ddd;
            border-radius: 5px;
            appearance: none;
        }

        .slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            background: #4caf50;
            border-radius: 50%;
            cursor: pointer;
        }

        .slider:focus {
            outline: none;
        }
    `;
    document.head.appendChild(style);
}


const scriptUrl = import.meta.url; // URL of the current module
const scriptName = scriptUrl.split('/').pop(); // Extract the file name
console.log(`- '${scriptName}' loaded!!`);