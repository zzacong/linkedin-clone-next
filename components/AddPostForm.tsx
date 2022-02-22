import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  MdArticle,
  MdBarChart,
  MdMoreHoriz,
  MdOutlinePhotoSizeSelectActual,
  MdVideocam,
  MdWork,
} from 'react-icons/md'
import { TiStarburst } from 'react-icons/ti'

export default function AddPostForm() {
  const { setFocus, handleSubmit, register } = useForm()

  const onCreatePost = handleSubmit(data => {
    console.log(data)
  })

  useEffect(() => {
    setFocus('input')
  }, [setFocus])

  return (
    <form className="t-primary flex flex-col" onSubmit={onCreatePost}>
      <div className="min-h-28 px-4 pt-3">
        <textarea
          {...register('input')}
          rows={4}
          placeholder="What do you want to talk about?"
          className="h-full w-full resize-none border-none bg-transparent p-2 placeholder-black/60 focus:ring-0 dark:placeholder-white/75"
          // value={input}
          // onChange={e => setInput(e.target.value)}
        />
      </div>

      <div className="px-4 pt-3">
        <button className="rounded px-2 py-1.5 font-semibold text-btnblue hover:bg-btnbluelight">
          Add hashtag
        </button>
      </div>

      <div className="flex justify-between pt-3 pb-4 pl-4 pr-6">
        <div className="flex items-center">
          <button className="t-secondary card-btn rounded-full p-2">
            <MdOutlinePhotoSizeSelectActual size={24} />
          </button>
          <button className="t-secondary card-btn rounded-full p-2">
            <MdVideocam size={24} />
          </button>
          <button className="t-secondary card-btn rounded-full p-2">
            <MdArticle size={24} />
          </button>
          <button className="t-secondary card-btn rounded-full p-2">
            <MdWork size={24} />
          </button>
          <button className="t-secondary card-btn rounded-full p-2">
            <TiStarburst size={24} />
          </button>
          <button className="t-secondary card-btn rounded-full p-2">
            <MdBarChart size={24} />
          </button>
          <button className="t-secondary card-btn rounded-full p-2">
            <MdMoreHoriz size={24} />
          </button>
        </div>
        <button
          className="rounded-full bg-btnblue px-4 py-1.5 font-semibold text-white hover:bg-btnbluedark focus:bg-btnbluedark disabled:cursor-not-allowed disabled:bg-white/75 disabled:text-black/40"
          type="submit"
          // onClick={uploadPost}
          // disabled={!input.trim() && !photoUrl.trim()}
        >
          Post
        </button>
      </div>
    </form>
  )
}
