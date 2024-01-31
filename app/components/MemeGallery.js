import getMemes from '../src/FetchMemes';
import MemeGalleryClient from './MemeGalleryClient';

const MemeGallery = async () => {
  const { memes, newAfter } = await getMemes();

  return (
    <>
      <MemeGalleryClient initialMemes={memes} firstAfter={newAfter} />
    </>
  );
};

export default MemeGallery;