import {tools} from './script_tools.js'; 
import * as interactions from './script_interactions.js'; 

let root = "World";

///////////////////////////////////////////////////////////////////////////////
async function redraw_a(plot_in, filtered) 
{
    var values = []; 
    var labels = []; 
    var parents = []; 
    
    // {0: '', 1: 'World', 2: 'Middle East', 3: 'Syria', values: 12} 
    let mapped = filtered.map(({country,best,region}) => ({2:region,3:country,values:1})); 
    mapped = mapped.map(item => ({0:'', 1:root,...item })); 

    const summedByContinent = interactions.sumValuesByAllColumnsWithParent(mapped);

    labels = summedByContinent.map(({key}) => key);
    values = summedByContinent.map(({value}) => value);
    parents = summedByContinent.map(({parent}) => parent);

    //plot_in.data[0].outsidetextfont = {size:10, color: "gray"}; 

    plot_in.data[0].values = values;
    plot_in.data[0].labels = labels;
    plot_in.data[0].parents = parents;
    Plotly.redraw(plot_in); 
}



export async function graph_create(graph_5, data) 
{
    var parents_list = ['']; 
    var labels_list = [root];
    var values_list = [0]; 

    var traces = [{
        values: values_list, 
        labels: labels_list, 
        parents: parents_list, 
        type: "sunburst", // icicle, 
        branchvalues: 'total', 
        leaf: {opacity:1.0},
        marker: {line:{width:2}},
        outsidetextfont: {size: 12, color: "#377eb8"},
    }];

    var layout = {
        margin: {l: 10, r: 10, b: 10, t: 10},
        plot_bgcolor: '#191A1A', //??
        paper_bgcolor: '#191A1A',
        font: {color: 'white', size:8,},  
        textfont: {size:8, color:"darkblue"},
    };

    var plot5 = document.getElementById(graph_5);
    Plotly.newPlot(plot5, traces, layout);    

    redraw_a(plot5, data); 
    return plot5; 
}


///////////////////////////////////////////////////////////////////////////////
export 
async function interaction_a(plot_in, data) 
{
    interactions.interaction_b_set(plot_in, data, redraw_a); 

    plot_in.on('plotly_click', plotly_click);
}


var plotly_click = function(eventData) 
{
    var label = eventData?.['points']?.[0]?.['label']; 
    var parent = eventData?.['points']?.[0]?.['parent']; 
    console.log( eventData?.['points']?.[0] ); 

    tools.event_sent('tools.EVENT_3_LABEL', {label,parent});
    tools.event_sent('plot5_event_label', {label,parent});
}


///////////////////////////////////////////////////////////////////////////////
const scriptUrl = import.meta.url; // URL of the current module
const scriptName = scriptUrl.split('/').pop(); // Extract the file name
console.log(`- '${scriptName}' loaded!!`);