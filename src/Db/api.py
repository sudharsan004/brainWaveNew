
import requests

images= []

for i in range(500):
    response = requests.get('https://fakeface.rest/face/json')
    images.append(response.json()['filename'])
    print(i)

file = open('data.txt','w')
file.write(str(images))
file.close()
print(images)

# open and write in file
file = open('data.txt','w')
file.write('img=[\n')
for i in images:
    file.write(f'"{str(i)}"'+',\n')
file.write(']')
