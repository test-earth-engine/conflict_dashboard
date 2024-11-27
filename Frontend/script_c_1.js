import {tools} from './script_tools.js'; 
import * as interactions from './script_interactions.js'; 


///////////////////////////////////////////////////////////////////////////////
async function redraw_a(plot_in, data) 
{
    let zs = plot_in.data?.[0]?.z; 
    let ws = plot_in.data?.[0]?.w; 
    let customdata = plot_in.data?.[0]?.customdata; 

    zs.forEach(row => row.fill(null));
    ws.forEach(row => row.fill(null));
    customdata.forEach(row => row.fill(null));

    console.log(`[table_container] data:'${data.length}'` );

    var filtered = data.map(({date_start}) => date_start);
    var unique = tools.GetUniqueValues(filtered); 
    console.log(`[table_container] unique:'${unique.length}'` );

    unique.forEach(item => 
    {
        let date_start = new Date(item); 
        let {weekNumer,dayOfWeek} = tools.GetWeekNumber(date_start); 

        let filtered = tools.GetFiltered(data, 'date_start', item); 
        //console.log( filtered ); 
        //let total = tools.GetSummation( filtered ); 
        ws[dayOfWeek-1][weekNumer-1] = date_start;
        zs[dayOfWeek-1][weekNumer-1] = filtered.length ;

        let txt = `${filtered.length}<br>${tools.formatUTCMonthDay(date_start)}`;
        customdata[dayOfWeek-1][weekNumer-1] = txt;
    }) 

    Plotly.redraw(plot_in); 
}


export async function graph_create(graph_4, data) 
{
    const daysOfWeek = [
        "Mon", "Tue", "Wed", 
        "Thu", "Fri", "Sat", "Sun"
    ];

    const zData = Array.from({length:7}, () => Array.from({length:52}, () => null) );
    const wData = Array.from({length:7}, () => Array.from({length:52}, () => null) );
    const custom = Array.from({length:7}, () => Array.from({length:52}, () => null) );

    const trace4 = 
    {
        z: zData,
        y: Array.from({length:7}, (_, i) => i + 1), // day number 
        x: Array.from({length:52}, (_, i) => i + 1), // week number
        w: wData, 
        customdata: custom,
        type: 'heatmap',
        showscale: false,
        colorscale: 'Viridis',
        hoverongaps: false, 
        hovertemplate: "%{customdata}<extra></extra>", 
    };

    const layout4 = 
    {
        margin: {l:50, r:50, b:50, t: 10},
        xaxis: 
        {
            title: {text:'Week Number', font:{size:10}},
            side: 'bottom', 
            tickangle: 0, 
            tickvals: Array.from({ length:13 }, (_, i) => (i + 1) * 4),
            ticktext: Array.from({ length:13 }, (_, i) => `${(i + 1) * 4}`),
            tickfont: {size:8, color: 'white'}
        },
        yaxis: 
        {
            automargin: true, 
            tickvals: Array.from({length:7}, (_,i) => i+1),
            ticktext: daysOfWeek, 
            tickfont: {size:8, color: 'white'}
        }, 
        plot_bgcolor: '#191A1A', // insite
        paper_bgcolor: '#191A1A', // outsite
        font: {color: 'white'},  
    };

    var plot4 = document.getElementById(graph_4);
    Plotly.newPlot(plot4, [trace4], layout4); 

    redraw_a(plot4, data); 
    return plot4; 
}


///////////////////////////////////////////////////////////////////////////////
export 
async function interaction_a(plot_in, data) 
{
    interactions.interaction_b_set(plot_in, data, redraw_a); 

    plot_in.on('plotly_click', (e) => plotly_click(e, plot_in, data)); 
    //plot_in.addEventListener('dblclick', (e) => plotly_doubleclick(e)); 
}


var plotly_doubleclick = async function(eventData) 
{
    console.log("plotly_doubleclick"); 
}


var plotly_click = async function(eventData, plot_in, data) 
{
    var points = eventData.points; 
    if(points && points[0]) 
    {
        var pointEvent = points["0"]; 
        var weekNumer = pointEvent.x; 
        var dayOfWeek = pointEvent.y; 
        var value = pointEvent.z; 

        var ws = pointEvent.data.w; 
        var date_start_index = ws[dayOfWeek-1][weekNumer-1]; 

        console.log(`[heatmap_container] week:${weekNumer} 
            day:${dayOfWeek} value:${value} date_start:${date_start_index}`); 

        if(clicked)
        {
            tools.event_sent('tools.EVENT_2_INDEX', {index:null}); 
            clicked = false; 
        }
        else
        {
            tools.event_sent('tools.EVENT_2_INDEX', {index:date_start_index}); 
            clicked = true; 
        }
    }
}

var clicked = false; 

///////////////////////////////////////////////////////////////////////////////
const scriptUrl = import.meta.url; // URL of the current module
const scriptName = scriptUrl.split('/').pop(); // Extract the file name
console.log(`- '${scriptName}' loaded!!`);