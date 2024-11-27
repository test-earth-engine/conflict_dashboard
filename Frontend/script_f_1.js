import {tools} from './script_tools.js'; 
import * as interactions from './script_interactions.js'; 


///////////////////////////////////////////////////////////////////////////////
async function redraw_a(plot_in, data) 
{
    let key = "date_start"; 
    let property = await interactions.table_create(data, key, true);  

    let xs = property.map(item => item["x"]); 
    let ys = property.map(item => item["n_filtered"]); 
    let indices = await tools.sortDatesIndices(xs); 

    xs = indices.map(index => xs[index]);
    ys = indices.map(index => ys[index]);

    plot_in.data[0].x = xs; 
    plot_in.data[0].y = ys; 
    plot_in.data[0].marker.color = ys; 
    plot_in.data[0].marker.colorscale = 'Viridis'; 

    Plotly.redraw(plot_in); 
} 


export 
async function graph_create(container, data) 
{
    let plot_traces = []; 
    let plot_layout = {};  
    let plot_config = {}; 

    var data1 = {type:'bar', x:[], y:[], marker:{color:null}}; 
    plot_traces.push( data1 );     

    plot_layout = 
    {
        font: {color: 'white'},  
        margin: {l:50, r:25, b:35, t: 0},
        showlegend: true,
        plot_bgcolor: '#191A1A',
        paper_bgcolor: '#191A1A',
        showlegend: false, 
        xaxis: {
            side: 'bottom', 
            title: {text:'Days', standoff:5, font:{size:10}},
            tickangle: 45, 
            tickvals: [], 
            //tickvals: Array.from({ length:366 }, (_, i) => (i + 1) * 2),
            //ticktext: Array.from({ length:366 }, (_, i) => ``),
            tickfont: {size:8, color: 'white'}
        },
        yaxis: {
            title: {text:'Events / Days', font:{size:10}}, 
            //range: [0,135],  
            tickfont: {size:8, color: 'white'}
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