import Avatar from '$components/Avatar'
import { motion } from 'framer-motion'
import {
  MdArticle,
  MdEvent,
  MdOutlinePhotoSizeSelectActual,
  MdVideocam,
} from 'react-icons/md'

export default function AddPost() {
  return (
    <div className="feed-card t-secondary">
      <div className="flex items-center p-4 pt-2">
        <a href="#" className="mr-2 flex rounded-full">
          <Avatar h={48} w={48} />
        </a>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="card-btn my-1 flex h-12 flex-grow items-center rounded-full border border-black/30 py-2.5 px-4 hover:border-none dark:border-gray-500"
        >
          <span className="text-sm font-semibold">Start a post</span>
        </motion.button>
      </div>

      <div className="flex flex-wrap justify-around pb-1">
        <button className="addpost-btn card-btn">
          <MdOutlinePhotoSizeSelectActual className="text-blue-400" size={24} />
          <h4 className="whitespace-nowrap">Photo</h4>
        </button>
        <button className="addpost-btn card-btn">
          <MdVideocam className="text-green-500" size={24} />
          <h4 className="whitespace-nowrap">Video</h4>
        </button>
        <button className="addpost-btn card-btn">
          <MdEvent className="text-yellow-500" size={24} />
          <h4 className="whitespace-nowrap">Event</h4>
        </button>
        <button className="addpost-btn card-btn">
          <MdArticle className="text-red-400" size={24} />
          <h4 className="whitespace-nowrap">Write article</h4>
        </button>
      </div>
    </div>
  )
}
