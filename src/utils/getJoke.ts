interface Joke {
  error: boolean;
  category: string;
  type: string;
  setup?: string;
  delivery?: string;
  joke?: string;
}

export const getJoke = async () => {
  try {
    const response = await fetch(
      'https://v2.jokeapi.dev/joke/Any?blacklistFlags=racist,sexist,explicit,political'
    );
    const data: Joke = await response.json();

    if (data.error) {
      console.error('Error fetching joke:', data.error);
      return null;
    }

    if (data.type === 'twopart') {
      return `${data.setup} ${data.delivery}`;
    } else {
      return data.joke || '';
    }
  } catch (error) {
    console.error('Error fetching joke:', error);
    return null;
  }
};
