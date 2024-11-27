import {tools} from './script_tools.js'; 
import * as interactions from './script_interactions.js'; 


///////////////////////////////////////////////////////////////////////////////
async function redraw_a(plot_in, data) 
{
    let xs = []; 
    let ys = []; 
    let x_key = null; 
    let y_key = null; 
    let indices = null; 

    // best population date_start
    x_key = "date_start";
    xs = data.map(item => item[x_key]); 

    y_key = "best"; 
    ys = data.map(item => item[y_key]); 

//    xs = tools.applyLogBase10(xs); 
    ys = tools.applyLogBase10(ys); 
    //ys = tools.normalizeArray(ys); 

    indices = await tools.sortedIndices(ys); 
    if(x_key === "date_start") indices = await tools.sortDatesIndices(xs); 
    xs = indices.map(index => xs[index]);
    ys = indices.map(index => ys[index]);

    plot_in.data[0].x = xs; 
    plot_in.data[0].y = ys; 
    //plot_in.data[0].marker.color = ys; 
    plot_in.data[0].marker.colorscale = 'Viridis'; 
    //plot_in.data[0].type = 'scatter'; 

    let update_layout = {}; 
    //update['yaxis.type'] = 'log';  
    //update_layout['type'] = 'scatter';
    update_layout['yaxis.title.text'] = y_key;
    update_layout['xaxis.title.text'] = x_key;   

    Plotly.redraw(plot_in); 
    Plotly.update(plot_in, {}, update_layout);
} 


export 
async function graph_create(container, data) 
{
    let plot_traces = []; 
    let plot_layout = {};  
    let plot_config = {}; 

    // type:'bar', type:'scatter',  
    var data1 = {
        x:[], y:[], 
        marker:{color:null}, 
        mode: 'markers+text',
    }; 

    plot_traces.push( data1 );     

    plot_layout = 
    {
        font: {color: 'white'},  
        margin: {l:30, r:10, b:15, t:0},
        showlegend: true,
        plot_bgcolor: '#191A1A',
        paper_bgcolor: '#191A1A',
        showlegend: false, 
        xaxis: {
            side: 'bottom', 
            title: {text:'Countries', standoff:5, font:{size:10}},
            tickangle: 45, 
            tickvals: [], 
            tickfont: {size:8, color: 'white'}, 
            //type: 'log',
        },
        yaxis: {
            title: {text:'Events', font:{size:10}}, 
            //range: [0,135],  
            tickfont: {size:8, color: 'white'}, 
            //type: 'log',
        }

    };

    let plot_container = document.getElementById(container);
    Plotly.newPlot(plot_container, plot_traces, plot_layout, plot_config); 

    redraw_a(plot_container, data); 
    return plot_container; 
} 


///////////////////////////////////////////////////////////////////////////////
export 
async function interaction_a(plot_in, data) 
{
    interactions.interaction_b_set(plot_in, data, redraw_a); 
}


///////////////////////////////////////////////////////////////////////////////
const scriptUrl = import.meta.url;
const scriptName = scriptUrl.split('/').pop(); 
console.log(`- '${scriptName}' loaded!!`);