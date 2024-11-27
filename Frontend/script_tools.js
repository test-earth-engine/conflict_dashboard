
export
function applyLogBase10(arr) {
    return arr.map(value => Math.log10(value));  // Applying log base 10
}


export 
function replaceKeyName(array, oldKey, newKey) {
    return array.map(obj => {
        if (obj.hasOwnProperty(oldKey)) {
            obj[newKey] = obj[oldKey]; // Add new key
            delete obj[oldKey];       // Remove old key
        }
        return obj;
    });
}

export 
async function sortedIndices(arr) 
{
    return arr.map((value, index) => ({ value, index })) 
    .sort((a, b) => b.value - a.value) 
    .map(({ index }) => index); 
}

export
function sortDates(dates, ascending = true) 
{
    return dates.sort((a, b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);

        return ascending ? dateA - dateB : dateB - dateA; 
    });
}

export 
function sortDatesIndices(dates, ascending = true) {
    return dates
        .map((date, index) => ({ date: new Date(date), index })) // Pair dates with indices
        .sort((a, b) => ascending ? a.date - b.date : b.date - a.date) // Sort by date
        .map(item => item.index); // Extract indices
}



export 
function normalizeArray(arr, bottom=0.0, ampl=1.0) 
{
    const min = Math.min(...arr);
    const max = Math.max(...arr);

    //console.log('Min:', min);  // Output: 1
    //console.log('Max:', max);  // Output: 8

    return arr.map(value => (value - min) / (max - min) * ampl + bottom);
}


export
async function loadJson(url) 
{
    try {
        const response = await fetch(url); // Fetch the JSON file
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); // Parse the JSON data
        return data; // Return the parsed JSON
    } catch (error) {
        console.error("Failed to load JSON:", error);
        throw error; // Propagate the error
    }
}


export 
async function filtering(data, items) 
{
    //console.log("[filtering]:", data.length );
    //console.log("[filtering]:", items);

    let filtered = data;
    if(items)
    {
        Object.entries(items).forEach(([key,value]) => 
        {
            if(value) 
            {
                filtered = filtered.filter(item => item[key] === value); 
                //console.log(`[filtering] filtered:'${ filtered.length }', Key:'${key}', Value:'${value}' `);
            }
        });         
    }

    return filtered; 
}


export 
async function GetSummation( arr ) 
{
    var summation = arr.map((item,index) => 
        item.reduce((accumulator, currentValue) => 
            accumulator + currentValue, 0)
    );

    return summation; 
}


export 
function GetFiltered(arr, key, value) {
    return arr.filter(item => item[key] === value); 
}

export 
function GetUniqueValues(arr) {
    return [...new Set(arr)];
}

export 
function CountUniqueValues(arr)
{
    const counts = arr.reduce((acc, value) => 
    {
        acc[value] = (acc[value] || 0) + 1; // Increment count or set to 1
        return acc;
    }, {}); // Start with an empty object

    return Object.entries(counts).map(([key, count]) => ({ value: key, count }));
}


export 
function GroupByKeys(arr, key1, key2) 
{
    return arr.reduce((acc, curr) => 
    {
        const groupKey = curr[key1];  
        if (!acc[groupKey]) 
        {
            acc[groupKey] = [];  
        }

        acc[groupKey].push(curr[key2]);  

        return acc;
    }, {});
}


export 
function GetWeekNumber(date) // See : ISO week rules
{
    // date = Wed Nov 20 2024 11:54:37 GMT-0500 (Eastern Standard Time)
    // return -> {weekNumer: 47, dayOfWeek: 3} 
    const targetDate = new Date(date.getTime());
    const startOfYear = new Date(targetDate.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((targetDate - startOfYear) / (24 * 60 * 60 * 1000)) + 1;
    const dayOfWeek = targetDate.getDay() || 7;
    var weekNumer = Math.ceil((dayOfYear + startOfYear.getDay() - dayOfWeek) / 7);
    return {weekNumer, dayOfWeek} 
}


export 
function GetUTCDate(day, utchours) // utchours -> (hours, minutes, seconds, milliseconds)
{
    if (utchours == null) {
        return new Date(day).toUTCString(); // Return UTC date if no hours are provided
    } else {
        const date = new Date(day); // Create a new date object
        date.setUTCHours(...utchours); // Spread the array to set the hours
        return date.toUTCString(); // Return the adjusted UTC date as a string
    }
}

export 
function formatUTCMonthDay(date) {
    const utcDate = new Date(date);
    const month = utcDate.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }); // Abbreviated month in UTC
    const day = utcDate.getUTCDate(); // Day in UTC
    return `${month}${day}`;
}

export 
async function interaction_test( plot_in ) 
{
    var plotly_hover = function(eventData) 
    {
        console.log("[plotly_hover]", eventData); 

        var points = eventData.points; 
        if(points && points[0]) 
        {
            var pointEvent = points["0"]; 
            console.log("[plotly_hover]", pointEvent.properties ); 
        }
    }

    var plotly_unhover = function(eventData) 
    {
        console.log("[plotly_unhover]", eventData); 

        var points = eventData.points; 
        if(points && points[0]) 
        {
            var pointEvent = points["0"]; 
            console.log("[plotly_unhover]", pointEvent.properties ); 

            //alert('You clicked this Plotly chart!');
        }
    }

    var plotly_click = function(eventData) 
    {
        console.log(`[plotly_click] eventData:`, eventData?.['points'] ); 

        if(!eventData) return; 

        var points = eventData.points; 
        if(points && points[0]) 
        {
            var pointEvent = points["0"]; 
            console.log("[plotly_click]", pointEvent.properties ); 
            //alert('You clicked this Plotly chart!');
        }
    }

    plot_in.on('plotly_hover', plotly_hover);  
    plot_in.on('plotly_unhover', plotly_unhover);  
    plot_in.on('plotly_click', plotly_click);  

    // onpointermove 
    var onpointerdown = function(eventData) 
    {
        console.log("[onpointerdown]", eventData); 
        if(!eventData) return; 
    }
    plot_in.onpointerdown = onpointerdown;  


    plot_in.addEventListener('dblclick', (eventData) => 
    {
        console.log("[dblclick]", eventData); 
    }); 
}

async function json_print(json_in) 
{
    console.log("[json_print] -------------------------------------------v"); 
    console.log(` '${JSON.stringify(json_in,null,2)}' `); 
    console.log("[json_print] -------------------------------------------^"); 
}


export
async function event_sent(event_name, detail) 
{
    const customEvent = new CustomEvent(event_name, {detail:detail,});
    window.dispatchEvent(customEvent); 

    //var json = JSON.stringify(detail,null,2); 
    //console.log(`[event_sent] event_name:'${event_name}'`, json);
}


export 
async function event_received(event_name, event_func)
{
    //console.log(`[event_received] event_name:'${event_name}'`, event_func); 

    let result = null; 

    if (event_func)
    {
        window.addEventListener(event_name, event_func);
    }
    else 
    {
        window.addEventListener(event_name, (eventData) => {
            console.log(`[event_received] event_func:`, eventData.detail); 
            result = eventData.detail; 
        });
    }
    
    return result; 
}

//tools.event_received('plot7_event1', , ()=>{} ); 
//tools.event_sent('plot7_event1', {data:1} ); 

async function DisplayInHTML(result, div_id) 
{
    const resultList = document.getElementById(div_id);
    resultList.innerHTML = '';    

    result.forEach((item, index) => 
    {
        const listItem = document.createElement('li');
        listItem.textContent = `${index} ${JSON.stringify(item, null, 2)}`;
        resultList.appendChild(listItem);
    }); 
}

export 
function interpolateColorRgb(colorStart, colorEnd, value) 
{
    // Ensure value is between 0 and 1
    value = Math.max(0, Math.min(1, value));

    // Perform linear interpolation for each color channel
    const r = Math.round(colorStart.r + value * (colorEnd.r - colorStart.r));
    const g = Math.round(colorStart.g + value * (colorEnd.g - colorStart.g));
    const b = Math.round(colorStart.b + value * (colorEnd.b - colorStart.b));

    // Return the resulting RGB color
    return `rgb(${r}, ${g}, ${b})`;
}


function generateCircleCoordinates(center, radius, numPoints = 16) 
{
    const circleCoords = [];
    const lon = center[0];
    const lat = center[1];

    for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * 2 * Math.PI; // Angle in radians
        const dx = radius * Math.cos(angle); // X offset (longitude)
        const dy = radius * Math.sin(angle); // Y offset (latitude)

        // Approximate the coordinates based on the Earth's radius and the desired distance
        const newLat = lat + (dy / 111300); // 1 degree of latitude ~ 111.3 km
        const newLon = lon + (dx / (111300 * Math.cos(lat * Math.PI / 180))); // Correct for longitude scaling

        circleCoords.push([newLon, newLat]);
    }

    // Close the polygon by repeating the first point at the end
    circleCoords.push(circleCoords[0]);
    return circleCoords;
}

export
function geo_circle_create({lon, lat, r=5000}) 
{
    let circle = {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [generateCircleCoordinates([lon,lat], r)] 
            },
            "properties": {
                "name": "Circle",
            }
        }]
    };

    return circle;
}


export
function getPointsInsideBBox(data, xmin, xmax, ymin, ymax) 
{
    // Get the current data points
    var xData = data.map(item => item['latitude']);
    var yData = data.map(item => item['longitude']);
    var selectedPoints = [];

    // Loop through points and check if they are inside the bbox
    for (var i = 0; i < xData.length; i++) {
        if (xData[i] >= xmin && xData[i] <= xmax && yData[i] >= ymin && yData[i] <= ymax) {
            //selectedPoints.push({ x: xData[i], y: yData[i] });
            selectedPoints.push( i ); 
        }
    }

    return selectedPoints;
}

export
function mergeJSONById(json1, json2) 
{
    const merged = json1.map(obj1 => {
        const match = json2.find(obj2 => obj2.id === obj1.id);
        return match ? { ...obj1, ...match } : obj1;
    });

    console.log("[mergeJSONById]", merged.at(0));
    return merged;
}


export const default_year = 2020; 

export const tools = 
{
    mergeJSONById, 
    default_year, 
    getPointsInsideBBox, 
    DisplayInHTML, 
    interaction_test, 
    json_print, 
    event_sent, 
    event_received, 
    GetWeekNumber,
    GetUTCDate, 
    formatUTCMonthDay, 
    GroupByKeys, 
    GetUniqueValues, CountUniqueValues,
    GetFiltered, 
    GetSummation, 
    filtering, 
    loadJson, 
    normalizeArray, 
    sortedIndices, 
    sortDates, 
    sortDatesIndices, 
    interpolateColorRgb, 
    geo_circle_create, 
    replaceKeyName, 
    applyLogBase10, 
};


export const EVENT_1_DATA = "event1_sent_data"; 
export const EVENT_2_INDEX = "plot4_event_index"; 
export const EVENT_3_LABEL = "event1_sent_label"; 



const scriptUrl = import.meta.url; // URL of the current module
const scriptName = scriptUrl.split('/').pop(); // Extract the file name
console.log(`- '${scriptName}' loaded!!`);