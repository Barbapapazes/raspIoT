import json
import time

with open('../socketio/data.json') as json_data:
    content = json.load(json_data)
    for bulb in content["bulbs"]:
        bulb["state"] = False
    content["python"] = True
    print(content)   
    

with open('../socketio/data.json', 'w') as json_data:
    json.dump(content, json_data, sort_keys=True, indent=2)    