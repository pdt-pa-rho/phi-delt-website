import json

json_file_path = 'pairs.json'

def count_unique_names():
    with open(json_file_path, 'r') as file:
        data = json.load(file)
    
    unique_names = set()
    
    for pair in data['pairs']:
        unique_names.add(pair['big'])
        
        for little in pair['littles']:
            unique_names.add(little)
    
    return len(unique_names)

if __name__ == "__main__":
    unique_count = count_unique_names()
    print(f"Number of unique names in the document: {unique_count}")
