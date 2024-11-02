const fs = require('fs').promises

// 1) Fetch data from this API: https://jsonplaceholder.typicode.com/users.
//  Parse the data so that each object contains only four properties:
//  id, name, username, and email. Write the resulting array to a file called users.json.


async function fetchData(){
  try{
    const response = await fetch('https://jsonplaceholder.typicode.com/users')

    const data = await response.json()

    const newData = data.map(user => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email
    }))

    await fs.writeFile('users.json', JSON.stringify(newData))
    
  }catch(e){
    console.log(e, 'error')
  }
}

// fetchData()

// 2) Run the command node main.js Ferrari 2020 red, retrieve the data from process.argv, and build a car object with the properties id, carModel, carColor, and carReleaseDate. Append this object to cars.json. Each time you run this command, a new object should be added to cars.json, so if you run it five times, you should have five objects in the file.

async function addCar() {
  try{
    const carModel = process.argv[2]
    const carColor = process.argv[3]
    const carReleaseDate = process.argv[4]
    try{

      const data = JSON.parse(await fs.readFile('cars.json', 'utf-8'));
      const newId = data[data.length - 1].id + 1
      
      const newCar = {
        "id": newId,
        carModel,
        carColor,
        carReleaseDate
      }
      data.push(newCar)

      await fs.writeFile('cars.json', JSON.stringify(data))

    }catch(e){

      const firstData = [
        {
          "id": 1,
          "carmodel": carModel,
          "carColor": carColor,
          "carReleaseDate": carReleaseDate
        }
      ]

      await fs.writeFile('cars.json', JSON.stringify(firstData))
      
    }
  }catch(e){
    console.log(e, 'error')
  }
}

// addCar()

// 3) Write a random text into a file named text.txt. Then, read this file and count how many vowels are present.

async function countVowels() {
  try{
    
    const textArray = (await fs.readFile('text.txt', 'utf-8')).split('')
    let count = 0
    for(let i = 0; i < textArray.length; i++){
      const vowels = /[aeiou]/;
      if(vowels.test(textArray[i])){
        count ++
      }
    }
    
    console.log(count)
  }catch(e){
    console.log(e, 'error')
  }
}

// countVowels()