import json
import time

with open('../socketio/data.json') as json_data:
    content = json.load(json_data)
    content["python"] = True
    content["state"] = False

with open('../socketio/data.json', 'w') as json_data:
    json.dump(content, json_data, sort_keys=True, indent=2)    