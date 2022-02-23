import { MouseEventHandler, useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { type SubmitHandler, useForm, ChangeHandler } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import {
  MdArticle,
  MdBarChart,
  MdClose,
  MdMoreHoriz,
  MdOutlinePhotoSizeSelectActual,
  MdVideocam,
  MdWork,
  MdArrowDropDown,
  MdPublic,
} from 'react-icons/md'
import { TiStarburst } from 'react-icons/ti'
import { uploadImage } from '$lib/utils'
import { storage } from '$lib/config/firebase'
import Avatar from '$components/Avatar'
import { modalState } from '$lib/atoms'

export default function AddPostForm() {
  const setModalOpen = useSetRecoilState(modalState)
  const [dataUrl, setDataUrl] = useState('')
  const { data: session } = useSession()
  const {
    setFocus,
    handleSubmit,
    register,
    watch,
    formState,
    reset,
    resetField,
  } = useForm<FormValues>()
  const { isSubmitting } = formState

  const onCreatePost: SubmitHandler<FormValues> = useCallback(
    async data => {
      if (!session?.user?.uid) return
      try {
        const { data: res } = await axios.post<{ id: number }>('/api/posts', {
          input: data.input.trim(),
        })
        const downloadURL = await uploadImage(
          storage,
          data.image[0],
          session.user.uid,
          res.id.toString()
        )
        await axios.patch(`/api/posts/${res.id}`, {
          photoUrl: downloadURL,
        })
        reset()
        setModalOpen(false)
      } catch (error) {
        console.error(error)
        alert(error)
      }
    },
    [reset, session?.user?.uid, setModalOpen]
  )

  const onSelectImage: ChangeHandler = async e => {
    const f = e.target.files?.[0]
    if (f) {
      const reader = new FileReader()
      reader.readAsDataURL(f)
      reader.onload = ev => {
        setDataUrl(ev.target?.result as string)
      }
    } else setDataUrl('')
  }

  useEffect(() => {
    setFocus('input')
  }, [setFocus])

  return (
    <div className="overflow-auto">
      <form
        className="t-primary flex h-full flex-col justify-between"
        onSubmit={handleSubmit(onCreatePost)}
      >
        <div className="flex-grow overflow-y-auto">
          <div className="flex items-center space-x-2 px-4 pt-3">
            <Avatar size={44} />
            <div className="flex flex-col justify-center">
              <h3 className="mb-1 text-base font-semibold">
                {session?.user?.name}
              </h3>
              <button className="card-btn t-secondary flex items-center justify-center rounded-full border border-black/60 px-3 py-1 dark:border-gray-500">
                <MdPublic size={16} />
                <span className="px-2 font-semibold">Anyone</span>
                <MdArrowDropDown size={24} />
              </button>
            </div>
          </div>

          <label className="min-h-28 block px-4 pt-3">
            <span className="sr-only">Post content</span>
            <textarea
              {...register('input')}
              rows={4}
              placeholder="What do you want to talk about?"
              className="h-full w-full resize-none border-none bg-transparent p-2 placeholder-black/60 focus:ring-0 dark:placeholder-white/75"
            />
          </label>

          {dataUrl && (
            <div className="relative my-3 mx-6">
              <ClearImageButton
                onClick={e => {
                  e.preventDefault()
                  resetField('image')
                  setDataUrl('')
                }}
              />
              <Image
                src={dataUrl}
                alt="Uploaded image"
                height="100%"
                width="100%"
                layout="responsive"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
          )}
        </div>

        <footer className="sticky bottom-0 bg-white dark:bg-dblue">
          <div className="px-4 pt-3">
            <button
              onClick={e => e.preventDefault()}
              className="rounded px-2 py-1.5 font-semibold text-btnblue hover:bg-btnbluelight dark:text-blue-400"
            >
              Add hashtag
            </button>
          </div>

          <div className="flex justify-between pt-3 pb-4 pl-4 pr-6">
            <div className="flex items-center">
              <label className="t-secondary card-btn block rounded-full p-2">
                <span className="sr-only">Choose image</span>
                <input
                  type="file"
                  {...register('image', {
                    onChange: onSelectImage,
                  })}
                  className="hidden"
                />
                <MdOutlinePhotoSizeSelectActual size={24} />
              </label>
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
              disabled={!watch('input')?.trim() || isSubmitting}
            >
              Post
            </button>
          </div>
        </footer>
      </form>
    </div>
  )
}

const ClearImageButton = ({ onClick }: { onClick: MouseEventHandler }) => (
  <button
    onClick={onClick}
    className="t-white-light hover:t-white absolute top-4 right-4 z-10 grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-black/60 transition-colors duration-200 hover:bg-black/90 focus:bg-black/90"
  >
    <MdClose size={24} />
  </button>
)

type FormValues = {
  input: string
  image: FileList
}
//
