import {tools} from './script_tools.js'; 


export 
function createToggleButton(container_name, option1, option2, func) 
{
    // Get the container div by its id
    const button = document.getElementById(container_name);
    button.textContent = option1; 

    function func_simple()
    {
        // Toggle button text on each click
        if (button.textContent === option1) {
            button.textContent = option2;
        } else {
            button.textContent = option1;
        }
    }

    // Add event listener for click event
    button.addEventListener('click', func_simple);
    button.addEventListener('click', func);    
}

export 
function createDropdownWithSelection(options, containerId, selectId) 
{
    const container = document.getElementById(containerId);

    // Create a select element
    const select = document.createElement('select');
    select.id = selectId; //'dynamic_select';

    // Populate the select with options
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        select.appendChild(opt);
    });
    select.value = tools.default_year; 

    // Create a button to get the selected option
    const button = document.createElement('button');
    button.textContent = 'Analyze';

    // Create a paragraph to display the selected option
    const output = document.createElement('p');
    output.id = 'output_container';

    // Add functionality to the button
    button.addEventListener('click', () => 
    {
        //output.textContent = `Selected: ${select.value}`;
        tools.event_sent(tools.EVENT_1_DATA, {data:select.value} );
    });

    // Append elements to the container
    container.appendChild(select);
    container.appendChild(button);
    container.appendChild(output);
}

export
function displayMessage(containerName, message) 
{
    let container = document.getElementById(containerName);

    if (!container) {
        container = document.createElement('div');
        container.id = containerName; // Assign the specified name as ID
        container.style.width = '200px';
        container.style.margin = '10px auto';
        container.style.border = '1px solid black';
        container.style.padding = '10px';
        document.body.appendChild(container);
    }

    container.innerHTML = message.split(',').map(phrase => phrase.trim()).join('<br>');    
    //container.textContent = message;
}



export 
function createCircularWheel(options, containerId, initialIndex) {
    const wheel = document.getElementById(containerId);
    const itemCount = options.length;

    // Populate the wheel
    options.forEach((option, index) => {
        const li = document.createElement('li');
        li.textContent = option;
        li.className = index === initialIndex ? 'selected' : '';
        wheel.appendChild(li);
    });

    let selectedIndex = initialIndex;

    // Add scroll functionality
    wheel.addEventListener('wheel', (event) => {
        event.preventDefault();
        const direction = event.deltaY > 0 ? 1 : -1;
        selectedIndex = (selectedIndex + direction + itemCount) % itemCount;

        // Update styles
        const items = wheel.querySelectorAll('li');
        items.forEach((item, idx) => {
            item.className = idx === selectedIndex ? 'selected' : '';
        });

        // Scroll effect
        const offset = -selectedIndex * 30; // Assume each item is 30px tall
        wheel.style.transform = `translateY(${offset}px)`;
    });
}

export 
function updateSliderValue(containerId) 
{
    // Create the necessary elements dynamically
    const container = document.getElementById(containerId);
    container.classList.add('slider-container');

    // Create label
    const label = document.createElement('label');
    label.setAttribute('for', 'slider');
    label.textContent = '';
    container.appendChild(label);

    // Create slider input
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.id = 'slider_a_container';
    slider.min = 0;
    slider.max = 100;
    slider.step = 1;
    slider.value = 50;
    container.appendChild(slider);

    const display = document.getElementById('span_a_container');
    slider.addEventListener('input', function() {
        display.textContent = slider.value;
    });
}


export 
function updateSliderValueById(id, newValue) 
{
    const sliderElement = document.getElementById(id); // Get the slider by its id
    if (sliderElement) {
        sliderElement.value = newValue; // Update the value
    } else {
        console.error(`Slider with id "${id}" not found.`);
    }
}


export 
function createLoadingSpinner() 
{
    // Create the loading overlay and spinner elements
    const overlay = document.createElement('div');
    overlay.classList.add('loading-overlay');
    
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    
    // Append the spinner to the overlay
    overlay.appendChild(spinner);
    
    // Append the overlay to the body
    document.body.appendChild(overlay);

    // Hide the loading spinner once the page is fully loaded
    window.onload = function() {
        overlay.style.display = 'none'; // Hide the overlay
    };
}


///////////////////////////////////////////////////////////////////////////////
const scriptUrl = import.meta.url;
const scriptName = scriptUrl.split('/').pop(); 
console.log(`- '${scriptName}' loaded!!`);