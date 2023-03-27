
/*
    This is a function that will get the data from the server and return it
    The data is not being returned yet.
*/
const GetData = async() => {
  try {
      const url = 'Commit data for ';
      console.log("fetching data from " + url); //log to see if if it works
      const response = await fetch(url); //wait for response
      const data = await response.json(); //get the data we need
      console.log(data); //print data for testing


    }
    catch (error) { 
      console.log(error) //error check
    }
  
};
  
  


export default GetData;