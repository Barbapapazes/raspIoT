import json
import time

time.sleep(0.02)

with open('../socketio/data.json') as json_data:
    content = json.load(json_data)
    #for bulb in content["bulbs"]:
    #    bulb["state"] = False
    content["python"] = True
    print(content["bulbs"][0]['state'])   
    

#with open('../socketio/data.json', 'w') as json_data:
#   json.dump(content, json_data, sort_keys=True, indent=2)    