from flask import Flask, render_template
from flask import request, jsonify
from urllib.parse import urlencode


import os
import socket
import requests
#import earth_tools 

## 
## .\Env2\Scripts\Activate.ps1
##
#earth_tools.authentification() 

#populationCalculator = earth_tools.PopulationCalculator() 

main_folder = os.path.join(os.getcwd(),'Frontend2') 

app = Flask(__name__, 
            template_folder=main_folder, 
            static_folder=main_folder
            )

@app.route('/ucdp_h')
def index():
    return render_template('ucdp_h.html')  

"""
@app.route('/gee')
def gee_test():
    ## SEE:
    ## https://developers.google.com/earth-engine/custom-apps/client-js
    return render_template('gee_test2.html')  


@app.route('/earth')
def earth_tools():
    populationCalculator.population_get() 
    populationCalculator.map_create() 
    #return render_template('gee_test.html')  
    return render_template('map.html')  

@app.route('/geojson_test')
def geojson_test():
    return render_template('geojson_test.html')  


@app.route('/map')
def map_test():
    return render_template('map_test.html')  


@app.route('/contribution_graph')
def contribution_graph():
    return render_template('ucdp_g.html')  


@app.route('/bootstrap_a')
def bootstrap_a():
    return render_template('bootstrap_a.html')  

@app.route('/ucdp_h')
def ucdp_h():
    return render_template('ucdp_h.html')  


# API route to fetch events from the external API
@app.route('/fetch-events', methods=['GET'])
def fetch_events():
    try:
        pagesize = request.args.get('pagesize', 10)  # Default to 10 if not provided
        countries = request.args.get('countries', '2,70')  # Default to '2,70' if not provided
        start_date = request.args.get('StartDate', '2020-01-01')  # Default to '2020-01-01' if not provided
        
        # Create a dictionary for the query parameters
        params = {
            'pagesize': pagesize,
            'StartDate': start_date,
        }

        # Manually encode the query parameters without encoding the comma in 'countries'
        query_string = urlencode(params, doseq=True)

        ## Construct the URL with the given parameters
        ## https://ucdp.uu.se/apidocs/
        url = 'https://ucdpapi.pcr.uu.se/api/gedevents/24.1'
        url_with_params = f"{url}?{query_string}&Country={countries}"
        print(f"url_with_params: {url_with_params}")

        # Send the GET request with the encoded URL
        response = requests.get(url_with_params)

        # Raise exception for HTTP errors
        response.raise_for_status()

        # Parse the JSON data from the response
        data = response.json()
        populationCalculator.data_set(data) 

        # Return the data as JSON to the frontend
        return jsonify(data)

    except requests.exceptions.RequestException as e:
        # If there's an error, return an error message
        return jsonify({"error": "Failed to fetch data", "details": str(e)}), 500
"""

if __name__ == '__main__':

    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)
    print(f"http://{local_ip}") 

    app.run(debug=True)

## python3 -m http.server 9000
## .\Env2\Scripts\Activate.ps1 
## python app.py 