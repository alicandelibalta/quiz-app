import axios from 'axios';

export const fetchQuestions = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data.slice(0, 10); 
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};
