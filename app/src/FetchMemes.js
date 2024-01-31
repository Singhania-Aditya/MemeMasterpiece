import axios from "axios";

export async function getMemes(after) {
  let memes = [];
  let newAfter;
  
  try {
    const response = await axios.get(`https://www.reddit.com/r/memes.json?after=${after}`);
    memes = response.data.data.children
      .filter((child) => child.data.post_hint === 'image')
      .map((child) => {
        const memeData = child.data;
        return {
          id: memeData.id,
          title: memeData.title,
          thumbnail: memeData.preview.images[0].resolutions[1].url.replace(/&amp;/g, '&'),
          url: memeData.url,
          width: memeData.preview.images[0].source.width,
          height: memeData.preview.images[0].source.height,
        };
      });
    
    newAfter = response.data.data.after;
    console.log("fetched memes")
  } catch (error) {
    console.error('Error fetching memes: ', error);
  }

  return { memes: memes, newAfter: newAfter };
};

export default getMemes;