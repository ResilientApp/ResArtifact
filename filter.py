# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
# 
#   http://www.apache.org/licenses/LICENSE-2.0
# 
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.    


import requests
import json
import re

def fix_json_with_commas(json_str):
    fixed_json = json_str.replace('}{', '},{')
    # Remove single characters and extra commas using regular expressions
    filtered_data = re.sub(r',\s*\b\w\b', '', fixed_json)
    return f"[{filtered_data}]"

def get_json_objects_by_public_key(json_data, owner_public_key=None, recipient_public_key=None):
    matching_objects = []
    if owner_public_key != None and recipient_public_key != None:
        for obj in json_data[0]:
            try:
                if owner_public_key in obj['inputs'][0]['owners_before'] and recipient_public_key in obj['outputs'][0]['public_keys']:
                    matching_objects.append(obj)
            except Exception as e:
                print(e)
    elif owner_public_key == None and recipient_public_key != None:
        for obj in json_data[0]:
            try:
                if recipient_public_key in obj['outputs'][0]['public_keys']:
                    matching_objects.append(obj)
            except Exception as e:
                print(e)
    elif owner_public_key != None and recipient_public_key == None:
        for obj in json_data[0]:
            try:
                if owner_public_key in obj['inputs'][0]['owners_before']:
                    matching_objects.append(obj)
            except Exception as e:
                print(e)
    else:
        for obj in json_data[0]:
            try:
                matching_objects.append(obj)
            except Exception as e:
                print(e)
    return matching_objects

def get_json_objects_by_name(json_data, n=None):
    matching_objects = []
    if n != None:
        for obj in json_data[0]:
            try:
                if n in obj['asset']['data']['name']:
                        matching_objects.append(obj)
            except Exception as e:
                print(e)
    else:
        for obj in json_data[0]:
            matching_objects.append(obj)
    return matching_objects
    
def get_json_objects_by_origin(json_data, o=None):
    matching_objects = []
    if o != None:
        for obj in json_data[0]:
            try:
                if o in obj['asset']['data']['origin']:
                        matching_objects.append(obj)
            except Exception as e:
                print(e)
    else:
        for obj in json_data[0]:
            matching_objects.append(obj)
    return matching_objects  
    
def get_json_objects_by_curatorId(json_data, o=None):
    matching_objects = []
    if o != None:
        for obj in json_data[0]:
            try:
                if o in obj['asset']['data']['curatorId']:
                        matching_objects.append(obj)
            except Exception as e:
                print(e)
    else:
        for obj in json_data[0]:
            matching_objects.append(obj)
    return matching_objects      

def get_json_objects_by_alll(json_data, o=None):
    matching_objects = []
    if o != None:
        for obj in json_data[0]:
            try:
                if o in obj['outputs'][0]['amount']:
                        matching_objects.append(obj)
            except Exception as e:
                print(e)
    else:
        for obj in json_data[0]:
            matching_objects.append(obj)
    return matching_objects 
    
def get_json_objects_by_museumId(json_data, o=None):
    matching_objects = []
    if o != None:
        for obj in json_data[0]:
            try:
                if o in obj['asset']['data']['museumId']:
                        matching_objects.append(obj)
            except Exception as e:
                print(e)
    else:
        for obj in json_data[0]:
            matching_objects.append(obj)
    return matching_objects     

def get_json_data(url, ownerPublicKey=None, recipientPublicKey=None):
    try:
        response = requests.get(url)
        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Parse the JSON data from the response
            json_text = fix_json_with_commas(response.text)
            json_data = json.loads(json_text)
            if ownerPublicKey == None and recipientPublicKey == None:
                matching_objects = get_json_objects_by_public_key(json_data, None, None)
                return matching_objects
            elif ownerPublicKey == None and recipientPublicKey != None:
                matching_objects = get_json_objects_by_public_key(json_data, None, recipientPublicKey)
                return matching_objects
            elif ownerPublicKey != None and recipientPublicKey == None:
                matching_objects = get_json_objects_by_public_key(json_data, ownerPublicKey, None)
                return matching_objects
            else:
                # Get all JSON objects that match the given publicKey
                matching_objects = get_json_objects_by_public_key(json_data, ownerPublicKey, recipientPublicKey)
                return matching_objects
        else:
            print(f"Error: Unable to retrieve data from {url}. Status code: {response.status_code}")
            return []

    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return []

def get_name_json_data(url, name=None):
    try:
        response = requests.get(url)
      
        if response.status_code == 200:
            json_text = fix_json_with_commas(response.text)
            json_data = json.loads(json_text)
            if name == None:
                matching_objects = get_json_objects_by_name(json_data, None)
                return matching_objects
            else:
                matching_objects = get_json_objects_by_name(json_data, name)
                return matching_objects
        else:
            print(f"Error: Unable to retrieve data from {url}. Status code: {response.status_code}")
            return []
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return []
        
def get_origin_json_data(url, origin=None):
    try:
        response = requests.get(url)
      
        if response.status_code == 200:
            json_text = fix_json_with_commas(response.text)
            json_data = json.loads(json_text)
            if origin == None:
                matching_objects = get_json_objects_by_origin(json_data, None)
                return matching_objects
            else:
                matching_objects = get_json_objects_by_origin(json_data, origin)
                return matching_objects
        else:
            print(f"Error: Unable to retrieve data from {url}. Status code: {response.status_code}")
            return []
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return []       
        
def get_curatorId_json_data(url, curatorId=None):
    try:
        response = requests.get(url)
      
        if response.status_code == 200:
            json_text = fix_json_with_commas(response.text)
            json_data = json.loads(json_text)
            if curatorId == None:
                matching_objects = get_json_objects_by_curatorId(json_data, None)
                return matching_objects
            else:
                matching_objects = get_json_objects_by_curatorId(json_data, curatorId)
                return matching_objects
        else:
            print(f"Error: Unable to retrieve data from {url}. Status code: {response.status_code}")
            return []
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return [] 
        
def get_museumId_json_data(url, museumId=None):
    try:
        response = requests.get(url)
      
        if response.status_code == 200:
            json_text = fix_json_with_commas(response.text)
            json_data = json.loads(json_text)
            if museumId == None:
                matching_objects = get_json_objects_by_museumId(json_data, None)
                return matching_objects
            else:
                matching_objects = get_json_objects_by_museumId(json_data, museumId)
                return matching_objects
        else:
            print(f"Error: Unable to retrieve data from {url}. Status code: {response.status_code}")
            return []
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return []       
        
def get_alll_json_data(url, alll=None):
    try:
        response = requests.get(url)
      
        if response.status_code == 200:
            json_text = fix_json_with_commas(response.text)
            json_data = json.loads(json_text)
            if alll == None:
                matching_objects = get_json_objects_by_alll(json_data, None)
                return matching_objects
            else:
                matching_objects = get_json_objects_by_alll(json_data, alll)
                return matching_objects
        else:
            print(f"Error: Unable to retrieve data from {url}. Status code: {response.status_code}")
            return []
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return []                     


def filter_by_keys(url, ownerPublicKey, recipientPublicKey):
    json_data = get_json_data(url, ownerPublicKey, recipientPublicKey)
    return json_data

def filter_by_name(url, name):
    json_data = get_name_json_data(url, name)
    return json_data
    
def filter_by_origin(url, origin):
    json_data = get_origin_json_data(url, origin)
    return json_data    
    
def filter_by_curatorId(url, curatorId):
    json_data = get_curatorId_json_data(url, curatorId)
    return json_data  
    
def filter_by_museumId(url, museumId):
    json_data = get_museumId_json_data(url, museumId)
    return json_data         
    
def filter_by_alll(url, alll):
    json_data = get_alll_json_data(url, alll)
    return json_data    
