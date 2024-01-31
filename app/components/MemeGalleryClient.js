"use client";

import { useState, useEffect } from 'react';
import getMemes from '../src/FetchMemes';
import InfiniteScroll from 'react-infinite-scroll-component';
import PhotoSwipeGallery from 'react-photoswipe';
import Masonry from 'react-masonry-css';
import 'react-photoswipe/lib/photoswipe.css';

/**
 * MemeGallery Component
 * Fetches and displays memes from Reddit's /r/memes subreddit.
 * Implements infinite scrolling and displays memes in a gallery view.
 * The initial memes are server-side rendered.
 */
const MemeGalleryClient = ({ initialMemes, firstAfter }) => {
  const [memes, setMemes] = useState(initialMemes || []);
  const [hasMore, setHasMore] = useState(true);
  const [after, setAfter] = useState('');
  const [galleryImages, setGalleryImages] = useState(
    initialMemes.map(meme => ({
      src: meme.url,
      w: meme.width,
      h: meme.height
    }))
  );
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Configure Masonry options
  const breakpointColumnsObj = {
    default: 5,
    3840: 5,
    1100: 3,
    500: 2
  };

  /**
   * Fetches memes from Reddit and updates component state.
   */
  const fetchMemes = async () => {
    const { memes, newAfter } = await getMemes(after);

    setMemes((prevMemes) => [...prevMemes, ...memes]);
    setGalleryImages((prevImages) => [
      ...prevImages,
      ...memes.map((meme) => ({ src: meme.url, w: meme.width, h: meme.height })),
    ]);
    setAfter(newAfter);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loader = document.getElementById('globalLoader');
      if (loader)
        loader.remove();
    }

    setAfter(firstAfter);
  }, []);

  /**
   * Used by the infinite scroll component.
   */
  const loadMore = () => {
    if (after !== null) {
      fetchMemes();
    } else {
      setHasMore(false);
    }
  };

  /**
   * Opens the Photoswipe gallery at the specified index.
   */
  const openGallery = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  /**
   * Closes the Photoswipe gallery.
   */
  const closeGallery = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={memes.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<h4>Brace for memes ...</h4>}
        endMessage={<p>Sorry, There are no more memes to load!!</p>}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {memes.map((meme, index) => (
            <div
              key={meme.id}
              data-index={index}
              className="thumbnail"
              onClick={() => openGallery(index)}
            >
              <img src={meme.thumbnail} width={meme.width} height={meme.height} alt={meme.title} />
              <div className="title">{meme.title}</div>
            </div>
          ))}
        </Masonry>

      </InfiniteScroll>

      <PhotoSwipeGallery
        items={galleryImages}
        isOpen={isOpen}
        onClose={closeGallery}
        options={{
          index: currentIndex,
          history: false,
          getThumbBoundsFn: (index) => {
            console.log(`Index: ${index}`);
            const thumbnail = document.querySelector(`.thumbnail[data-index="${index}"]`);

            if (!thumbnail) {
              console.error(`Thumbnail with index ${index} not found.`);
              return null;
            }
            const pageYScroll = window.scrollY || document.documentElement.scrollTop;
            const rect = thumbnail.getBoundingClientRect();
            return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
          },
        }}
      />

      <style jsx>{`
        .gallery {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 26px;
          margin: 32px;
        }

        .thumbnail {
          position: relative;
          cursor: pointer;
          overflow: hidden;
          border-radius: 8px;
          transition: transform 0.2s ease-in-out;

          img {
            width: 100%;
            height: auto;
            border-radius: 8px;
            object-fit: cover;
            box-shadow: 9px 6px 5px rgba(0, 0, 0, 0.5);
          }

          &:hover {
            transform: scale(1.05);
            box-shadow: 9px 6px 5px rgba(0, 0, 0, 0.7);
          }
        }

        .thumbnail:hover .title {
          visibility: visible;
          opacity: 1;
        }

        .title {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          color: #ffffff;
          padding: 5px;
          box-sizing: border-box;
          visibility: hidden;
          opacity: 0;
          transition: visibility 0s, opacity 0.5s linear;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-size: 1rem;
        }

        h4 {
          display: block;
          font-size: 2rem;
          color: rgb(93, 136, 222);
          margin: 35px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          text-align: center;
          font-weight: bold;
        }

        p {
          display: block;
          font-size: 2rem;
          color: rgb(93, 136, 222);
          margin: 35px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          text-align: center;
          font-weight: bold;
        }

      `}</style>
    </div>
  );
};

export default MemeGalleryClient;
