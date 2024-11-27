import {tools} from './script_tools.js'; 
import * as interactions from './script_interactions.js'; 


//let colorEnd = {r: 255, g: 0, b: 0}; // Red
//let colorStart = {r: 0, g: 0, b: 255}; // Blue
//let colorEnd = { r: 255, g: 165, b: 0 }; // Orange
let colorEnd = { r: 255, g: 255, b: 0 }; // Yellow
let colorStart = { r: 255, g: 105, b: 180 }; // Pink
let colorGet = (val) => tools.interpolateColorRgb(colorStart, colorEnd, val); 


async function add_markers_style(graph, prop) 
{
    let sizes = prop.map( item => {
        let color = null; 
        if(( 0 <= item)&&(item < 5))  color = 3.0;  
        if(( 5 <= item)&&(item < 10)) color = 4.0;  
        if((10 <= item) ) color = 6.0;  
        //console.log(item, color); 
        return color; 
    });

    let colors = tools.normalizeArray(sizes); 
    colors = colors.map(item => colorGet(item)); 
    var line = {color: 'black', width: 1}; 

    graph['marker'] = 
    {
        line: line, 
        size: sizes, 
        color: colors, 
        //colorscale: 'Viridis',
        cmin: 0.0,
        cmax: 1.0, 
    };    
}

async function redraw_a(plot_in, data) 
{
    var prop = data.map(d => d?.['best'])
    var values = tools.applyLogBase10( prop );
    
    var latitudes = data.map(d => d.latitude );
    var longitudes = data.map(d => d.longitude );
    console.log(`[densitymap_a_create]: bests:'${values.length}' ` ); 

    plot_in.data.forEach(element => {
        element.z = values; 
        element.lat = latitudes; 
        element.lon = longitudes;         
    });

    add_markers_style(plot_in.data[0], prop, prop); 

    Plotly.redraw(plot_in); 

    plot_in.on('plotly_relayout', (e) => 
        handleZoomEvent(e, plot_in, data) 
    ); 
}


///////////////////////////////////////////////////////////////////////////////
const reversedJet = [
    [0, '#0000ff'],    // Blue
    [0.125, '#0000cc'], // Dark Blue
    [0.25, '#000099'],  // Medium Blue
    [0.375, '#0099ff'], // Light Blue
    [0.5, '#00cc00'],   // Green
    [0.625, '#ffff00'], // Yellow
    [0.75, '#ff9900'],  // Orange
    [0.875, '#ff0000'], // Red
    [1, '#990000']      // Dark Red
];

async function densitymap_a_create(latitudes, longitudes, values) 
{
    var densitymap1 = {
            type: "densitymap", 
            opacity: 0.5, 
            z: values, 
            lat: latitudes, 
            lon: longitudes, 
            mode: 'lines',
            radius: 25,
            colorscale: 'Grays', //, reversedJet, 
            showscale: false,
    };

    return densitymap1; 
}


async function scattermap_a_create(latitudes, longitudes, values) 
{
    var scattergeo = {
            type: "scattermap", 
            z:values, 
            lat:latitudes, 
            lon:longitudes, 
            hoverinfo:"y", 
            showscale: false,
            marker : {size:3}, //, colorscale:'Viridis'}, 
            //mode:'markers',
        }; 

    return scattergeo; 
}



export async function graph_create(plot3_container, data) 
{
    var values = [];
    var densitymap_a = await densitymap_a_create([], [], values);
    var scattermap_a = await scattermap_a_create([], [], values);

//    var 
    traces = [];
    traces.push( scattermap_a );
    traces.push( densitymap_a );
    traces.push( {} );

    plot3_layout = 
    {
        font: {color: 'white'},  
        map: 
        {
            zoom: 1.125, 
            style: "dark", 
            center: {lon:0, lat:20}, 
            domain: {x:[0,1], y:[0,1]}
        },
        margin: {t:10,b:10, l:10, r:10}, 
        showlegend: false, 
        plot_bgcolor: '#191A1A', //??
        paper_bgcolor: '#191A1A',
        xaxis : {tickvals: []}, 
        yaxis : {tickvals: []}, 
    };

    // https://chart-studio.plotly.com/create/ 
    plot3_config = {}; 
    plot3_config['scrollZoom'] = true; 
    plot3_config['staticPlot'] = interactions.selected['static'],  
    plot3_config['doubleClick'] = 'reset'; 
    plot3_config['displayModeBar'] = true; 
    plot3_config['doubleClickDelay'] = 1000; 

    var plot3 = document.getElementById(plot3_container);
    Plotly.react(plot3, traces, plot3_layout, plot3_config); 
    redraw_a(plot3, data); 

    return plot3; 
} 

var traces = null; 
var plot3_layout = null; 
var plot3_config = null; 


///////////////////////////////////////////////////////////////////////////////
export 
async function interaction_a(plot_in, data) 
{
    interactions.interaction_b_set(plot_in, data, redraw_a); 
}

async function handleZoomEvent(eventData, plot_in, data) 
{

    console.log( eventData?.dragmode ); 

    console.log( eventData ); 

    let center = eventData['map.center'];
    //traces_add(plot_in, [center.lat], [center.lon]); 

    let coordinates = eventData['map._derived']?.['coordinates'];
    if(!coordinates) return ;
    console.log( coordinates ); 

    let lons = coordinates.map(item => item[0])
    let lats = coordinates.map(item => item[1])
    traces_add(plot_in, lats, lons); 

    const lats_min = Math.min(...lats);
    const lats_max = Math.max(...lats);

    const lons_min = Math.min(...lons);
    const lons_max = Math.max(...lons);
    //console.log( lats_min, lats_max, lons_min, lons_max); 

    let points = data.map(({latitude,longitude,date_start})=> ({latitude,longitude,date_start})); 
    //console.log( points.at(0) ); 

    let selectedPoints = tools.getPointsInsideBBox(points, lats_min, lats_max, lons_min, lons_max); 
    points = selectedPoints.map(id => points[id]); 
    console.log("points:", points.length ); 

    if(points.length < 200)
    {
        let layers = await layers_create(points); 
        console.log("layers:", layers.length );
        //Plotly.relayout(plot_in, {'map.layers':layers});
        Plotly.update(plot_in, {}, {'map.layers':layers});
    }
} 


async function traces_add(plot_in, lats, lons) 
{
    let trace = {}; 
    trace['lat'] = lats; 
    trace['lon'] = lons; 
    trace['name'] = 'bbox'; 
    trace['type'] = "scattermap"; 
    trace['marker'] = {size:10};

    Plotly.deleteTraces(plot_in, 2); 
    Plotly.addTraces(plot_in, trace, [2]);
}


function layer_create({lon, lat}, value=0.5) 
{
    //let color = tools.interpolateColorRgb(colorStart, colorEnd, value)

    let layer = 
    {
        type: "fill", 
        color: grayColor, 
        opacity: 0.25,
        source: tools.geo_circle_create({lon:lon, lat:lat}),
    };

    return layer; 
}


async function layers_create(data) 
{
    let layers = data.map( ({latitude,longitude}) => {
        return layer_create({lat:latitude, lon:longitude, r:50000}); 
    }); 

    return layers; 
} 

let Black = {r: 0, g: 0, b: 0};    // Black
let White = {r: 255, g: 255, b: 255}; // White
let grayColor = tools.interpolateColorRgb(Black, White, 0.75);



///////////////////////////////////////////////////////////////////////////////
const scriptUrl = import.meta.url;
const scriptName = scriptUrl.split('/').pop(); 
console.log(`- '${scriptName}' loaded!!`);