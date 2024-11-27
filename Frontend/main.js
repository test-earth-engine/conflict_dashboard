import {tools} from './script_tools.js';     
import * as m_data from './script_data.js'; 
import * as script_html from './script_html.js'; 
import * as script_b_1 from './script_b_1.js'; 
import * as script_c_1 from './script_c_1.js'; 
import * as script_d_1 from './script_d_1.js'; 
import * as script_f_1 from './script_f_1.js'; 
import * as script_j_1 from './script_j_1.js'; 
import * as script_j_2 from './script_j_2.js'; 
import * as interactions from './script_interactions.js'; 
import * as script_css from './script_css.js'; 

window.tools_json_print = tools.json_print;

something(); 

html_interaction(); 

const container_year = document.getElementById('dropdown_a_value'); 
main(container_year.value); 

tools.event_received(tools.EVENT_1_DATA, (e) => main( e.detail?.['data'] )); 


async function main(year) 
{
    // (country, country_id, best, date_end, date_start, date_diff, id, latitude, longitude)
    var ucpd_data = await m_data.ucpd_data_get(year); 
    var polulation = await m_data.gpw_polulation_data_get(); 
    ucpd_data = tools.mergeJSONById(ucpd_data, polulation); 

    await box_class_1_1(ucpd_data, year); 
    
    var undp_data = await m_data.preprocessing_data(ucpd_data); 
    m_data.test_filtering(undp_data); 

    var filtered = await m_data.test_filtering_2(undp_data); 
    console.log("m_data:", filtered.length ); 

    let graphs = {}; 
    graphs["box_class_2_2"]   = script_d_1; // map.  
    graphs["box_class_1_2_1"] = script_f_1; // bar. Events vs Day 
    graphs["box_class_1_2_2"] = script_c_1; // heatmap. tools.EVENT_3_LABEL -> 
    graphs["box_class_2_1_1"] = script_b_1; // sunburst. tools.EVENT_2_INDEX ->
    graphs["box_class_2_1_2"] = script_j_1; // bar. Events Vs Country
    //graphs["box_class_2_1_2"] = script_j_2; // bar. Events Vs Country

    const promises = Object.entries(graphs).map(async ([key,value]) => 
    {
        const graph = await value.graph_create(key, filtered);
        value.interaction_a(graph, undp_data);
    });

    await Promise.all(promises);
}


async function box_class_1_1(ucpd_data, year) 
{

    let message_a = `-- Year selected: '${year}',-- Events:'${ucpd_data.length}' `;
    script_html.displayMessage("message_a_container", message_a); 

    tools.event_received('tools.EVENT_2_INDEX', (e) => 
    {
        let day_selected = e.detail?.['index']; 
        interactions.selected['day'] = day_selected; 
        if (day_selected) day_selected = tools.formatUTCMonthDay(day_selected);

        let message_b = `-- Area selected: '${interactions.selected['label']}' 
                                        (${interactions.selected['parent']}),  
                                -- day: ${interactions.selected['day']} `;
        script_html.displayMessage("message_b_container", message_b); 
    }); 

    tools.event_received('tools.EVENT_3_LABEL', (e) => 
    {
        let label_selected = e.detail?.['label']; 
        let parent_selected = e.detail?.['parent']; 
        interactions.selected['label'] = label_selected; 
        interactions.selected['parent'] = parent_selected; 

        let message_b = `-- Area selected: '${interactions.selected['label']}' 
                                        (${interactions.selected['parent']}), 
                                -- day: ${interactions.selected['day']} `;
        script_html.displayMessage("message_b_container", message_b); 
    });     
}    


async function html_interaction() 
{
    script_html.createToggleButton(
        "button_a_static",  "Static", "Interactive",() => {
        interactions.selected['static'] = !interactions.selected['static']; 
    }); 
}


async function something()
{
    script_css.createSliderStyles();
    script_html.createLoadingSpinner();

    const options = []; 
    options.push("2023"); 
    options.push("2022"); 
    options.push("2021"); 
    options.push("2020"); 
    script_html.createDropdownWithSelection(options, 
        'dropdown_a_container', 
        'dropdown_a_value'
    );
}