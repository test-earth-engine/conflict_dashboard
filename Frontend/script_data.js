import {tools} from './script_tools.js'; 


export 
async function gpw_polulation_data_get() 
{
    // reference here... 
    var url = null; 
    let year = 2020; 
    url = `https://raw.githubusercontent.com/test-earth-engine/gee1/main/Jsons/ucdp_v241_y${year}_gpw_population.json`;

    const jsonData = await tools.loadJson(url); 
    console.log(`[gpw_polulation_data_get] year:${year} length:${ jsonData.length }` );
    return jsonData; 
}



export 
async function ucpd_data_get( year ) 
{
    // reference here... 
    var url = null; 
    //url = "https://raw.githubusercontent.com/test-earth-engine/gee1/main/Jsons/ucdp_v241_y2023.json";
    //url = "https://raw.githubusercontent.com/test-earth-engine/gee1/main/Jsons/ucdp_v241_y2021.json";
    //url = "https://raw.githubusercontent.com/test-earth-engine/gee1/main/Jsons/ucdp_v241_y2022.json";
    url = `https://raw.githubusercontent.com/test-earth-engine/gee1/main/Jsons/ucdp_v241_y${year}.json`;

    const jsonData = await tools.loadJson(url); 
    console.log(`[ucpd_data_get] year:${year} length:${ jsonData.length }` );
    return jsonData; 
}


export 
async function preprocessing_data( ucpd_data ) 
{
    // (country, country_id, best, date_end, date_start, id, latitude, longitude)
    ucpd_data.forEach( item => {
        item.date_end = tools.GetUTCDate(item.date_end);
        item.date_start = tools.GetUTCDate(item.date_start);

        let {weekNumer,dayOfWeek} = tools.GetWeekNumber(new Date(item.date_start)); 
        item.week_number = weekNumer; 
    }); 

    console.log("ucpd_data:", ucpd_data[0] ); 
    return ucpd_data; 
}



export
async function test_filtering_1(undp_data) 
{
    var iwant = {}
    var filtered = await tools.filtering(undp_data, iwant); 

    var test = filtered.length === undp_data.length; 
    console.log("[test_filtering_1]:", filtered.length, test);
    return filtered; 
}    

export
async function test_filtering_2(undp_data) 
{
    // 2020 | 13384 
    // 2020 | 2020-01-01T00:00:00 | 135 
    // 2020 | "South Africa" | 18 

    // 2020 | Africa | "2020-01-01T00:00:00" | 22 

    // 2020 | Africa | 3632  
    // 2020 | Africa | "South Africa" | 18   
    // 2020 | Africa | "South Africa" | "2020-01-01T00:00:00" | 3 
    var iwant = {}; 
    //iwant['region'] = "Africa"; 
    //iwant['country'] = "South Africa"; 
    iwant['date_end'] = null; // no applied
    //iwant['date_start'] = tools.GetUTCDate("2020-01-01T00:00:00"); // 135 
    var filtered = await tools.filtering(undp_data, iwant); 

    var test = filtered.length === 3; 
    console.log("[test_filtering_2]:", filtered.length, test);
    return filtered; 
}    



export
async function test_filtering(undp_data) 
{
    test_filtering_1(undp_data); 
    test_filtering_2(undp_data); 
}





const scriptUrl = import.meta.url; // URL of the current module
const scriptName = scriptUrl.split('/').pop(); // Extract the file name
console.log(`- '${scriptName}' loaded!!`);
