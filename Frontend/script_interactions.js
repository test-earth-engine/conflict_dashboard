import {tools} from './script_tools.js'; 


export 
function sumValuesByAllColumnsWithParent(data) 
{
    const result = {};

    // Iterate through each item in the data
    data.forEach(item => {
        let previousParentValue = null; // Keeps track of the parent for each level

        // Iterate through each key in the current item (except the 'values' key)
        Object.keys(item).forEach(key => {
            if (key === 'values') return; // Skip 'values' as it's the sum to add

            const keyValue = item[key];  // Value of the current column (continent, country)
            const value = item.values;   // The value to sum


            if (!result[key]) {
                result[key] = {};
            }


            if (key === '1') {
                previousParentValue = null; // The top level (1) has no parent
            } else {
                previousParentValue = item[parseInt(key) - 1]; // Parent is the previous level's value
            }


            if (result[key][keyValue]) {
                result[key][keyValue].value += value;
            } else {
                result[key][keyValue] = { value: value, parent: previousParentValue };
            }
        });
    });

    let flattenedResult = [];
    for (const column in result) {
        for (const key in result[column]) {
            flattenedResult.push({
                column: column,
                key: key,
                value: result[column][key].value,
                parent: result[column][key].parent
            });
        }
    }

    return flattenedResult;
}



///////////////////////////////////////////////////////////////////////////////
export
async function frame_create(data, lookingfor, xs_key, zs_key, ws_keys) 
{
    let filtered = tools.GetFiltered(data, zs_key, lookingfor);     
    let table = await table_create(filtered, xs_key, false); // (true, n_filtered); (false, filtered)

    var xs = table.map(d => d?.['x'] ); // [xs_key1, xs_key2,...]
    var ys = table.map(d => d?.['filtered'] ); // [{...}, {...}, ...]

    if(ws_keys)
    {
        ys = ys.map(items => {
            return items.map(item => 
                Object.fromEntries(ws_keys.map(ws_key => [ws_key, item[ws_key]]))
            )
        }); 
    }
    else
    {
        ys = ys.map(item => item.length ); // equivalent to '(true, n_filtered)'

        let indices = await tools.sortedIndices( ys ); 
        xs = indices.map(index => xs[index]);
        ys = indices.map(index => ys[index]);             
    }
    
    return ({x:xs, y:ys, name:lookingfor});
}


export
function updatemenus_create(params) 
{
    let animation_props = {
        transition: {duration:500, easing: 'cubic-in-out'},
        frame: {duration:0, redraw: true,}, 
        mode: 'immediate', 
        fromcurrent: true,
    }; 

    let pause_args = {
        mode: 'immediate', // next |immediate, //Uncaught (in promise) undefined??
        transition: {duration: 0},
        frame: {duration: 0, redraw: true}
    };

    let play = {
        label: 'Play',
        method: 'animate',
        args: [null, animation_props],
    }; 

    let pause = {
        label: 'Pause', 
        method: 'animate',
        args: [[], pause_args], // Uncaught (in promise) undefined ??
    };

    let updatemenus = [{
        x: 0,
        y: 0,
        pad: {t:100, r:0},
        type: 'buttons',
        yanchor: 'center',
        xanchor: 'center',
        direction: 'left',
        showactive: false,
        buttons: [play, pause]
    }];     

    return updatemenus; 
}

export
function sliders_create(frame_names, visible) 
{
    let animation_props = {
        transition: {duration:0, easing: 'cubic-in-out'},
        frame: {duration:500, redraw: true,}, 
        mode: 'immediate', 
        fromcurrent: true,
    }; 

    var sliderSteps = [];
    for (var i = 0; i < frame_names.length; i++) 
    {
        let step = {
            method: 'animate',
            label: frame_names[i],
            args: [[frame_names[i]], animation_props]
        };
        
        sliderSteps.push(step);
    }
    
    let sliders = [{
        steps: sliderSteps, 
        currentvalue: {
          visible: false,
          prefix: '',
          xanchor: 'center',
          yanchor: 'center',
          font: {size: 20, color: '#666',}
        },
        font: {size:0, color:'rgba(0,0,0,0)'}, 
        pad: {l: 0, t: 0},
        visible: visible, 
    }];

    return sliders;
}


export 
function AnimationPause(plot_in) 
{
    AnimationSet(plot_in, [], 'immediate', 0, 0);
}


export 
function AnimationPlay(plot_in, transition_duration, frame_duration) 
{
    AnimationSet(plot_in, null, 'immediate', transition_duration, frame_duration);
}


export 
async function AnimationSet(plot_in, 
    groupOrFrames, 
    mode, 
    frame_duration, 
    transition_duration
) 
{
    let animation_props = {
        mode: mode, 
        frame: {duration:frame_duration, redraw: true,}, 
        transition: {duration:transition_duration, easing: 'cubic-in-out'},
        fromcurrent: true,
    }; 

    Plotly.animate(plot_in, groupOrFrames, animation_props); 
}


///////////////////////////////////////////////////////////////////////////////
export 
async function property_table_redraw(plot_in, data, key, sort) 
{
    let property = await table_create(data, key, true);  

    let xs = property.map(item => item["x"]); 
    let ys = property.map(item => item["n_filtered"]); 
    //console.log("[redraw_a] xs:", xs); 
    //console.log("[redraw_a] ys:", ys); 

    if(sort)
    {
        let indices = await tools.sortedIndices(ys); 
        plot_in.data[0].x = indices.map(index => xs[index]); 
        plot_in.data[0].y = indices.map(index => ys[index]);    
    }
    else
    {
        plot_in.data[0].x = xs; 
        plot_in.data[0].y = ys; 
    }

    Plotly.redraw(plot_in); 
}


///////////////////////////////////////////////////////////////////////////////
export 
async function table_create(data, key, reduce) 
{
    //console.log(`[table_create] data:'${data.length}'`);

    var xs_values = data.map(item => item[key]);
    //console.log(`[table_create] data:'${xs_values.length}'`);

    var xs_unique = tools.GetUniqueValues(xs_values); 
    //console.log(`[table_create] xs_unique:'${xs_unique.length}'`);

    let ys_values = xs_unique.map(x => 
    {
        let filtered = tools.GetFiltered(data, key, x); 
        let n_filtered = filtered.length;

        if(reduce)
        {
            return {x, n_filtered}; 
        }
        else
        {
            return {x, filtered}; 
        }
    }) 

    //console.log(`[table_create] ys_values:'${ys_values.length}'`);
    return ys_values; 
}


export 
async function _interaction_a_set(plot_in, data, redraw_func) 
{
    tools.event_received('plot4_event_index', 
        (e) => event_received_a(e, plot_in, data, redraw_func)
    )

    tools.event_received('plot5_event_label',
        (e) => event_received_a(e, plot_in, data, redraw_func)
    );
}


export 
async function event_received_a(eventData, plot_in, data, redraw_func) 
{
    date_start_1 = await eventData?.['detail']?.['index']; 
    country_1 = await eventData?.['detail']?.['label']; 
    region_1 = await eventData?.['detail']?.['parent']; 
/*
    console.log(`[event_received_a] 
        region:'${region_1}' 
        country:'${country_1}' 
        date_start_1:'${date_start_1}' 
        `); 
*/
    filtering_a(
        plot_in, data, 
        country_1, region_1, date_start_1, 
        redraw_func
    ); 
} 


export 
async function interaction_b_set(plot_in, data, redraw_func) 
{
    tools.event_received('tools.EVENT_2_INDEX', 
        (e) => event_received_b(e, plot_in, data, redraw_func)
    )

    tools.event_received('tools.EVENT_3_LABEL',
        (e) => event_received_b(e, plot_in, data, redraw_func)
    );
}

export 
async function event_received_b(eventData, plot_in, data, redraw_func) 
{
//    console.log( selected );     
    filtering_a(
        plot_in, data, 
        selected['label'], selected['parent'], selected['day'], 
        redraw_func
    ); 
} 


///////////////////////////////////////////////////////////////////////////////
export
async function filtering_a(
    plot_in, data, 
    country, region, date_start, 
    redraw_func) 
{
    var iwant = {}

    iwant['region'] = region; 
    iwant['country'] = country;

    if(date_start) 
    {
        iwant['date_start'] = tools.GetUTCDate(date_start); 
    }

    if(region === 'World') 
    {
        iwant['region'] = country; 
        iwant['country'] = null;
    }

    if(country === 'World') 
    {
        iwant['region'] = null; 
        iwant['country'] = null;
    }

    var filtered = await tools.filtering(data, iwant); 
    redraw_func(plot_in, filtered);

    date_start = null; 
    country = null; 
    region = null; 
}


let region_1 = null; 
let country_1 = null;
let date_start_1 = null; 


export
let selected = {}; 
selected['day'] = null; 
selected['label'] = null; 
selected['parent'] = null; 
selected['static'] = false; 


///////////////////////////////////////////////////////////////////////////////
const scriptUrl = import.meta.url;
const scriptName = scriptUrl.split('/').pop(); 
console.log(`- '${scriptName}' loaded!!`);