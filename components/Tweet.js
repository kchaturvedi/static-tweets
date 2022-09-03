const Tweet = ({ tweet }) => {
  return (
    <div className='bg-slate-100 border border-slate-300 rounded-2xl duration-300 my-8 p-5 max-w-xl mx-auto'>
      <div className='flex justify-between'>
        <a className='flex items-center gap-3 group' href={tweet.url}>
          <img className='rounded-full h-12 w-12' src={tweet.author.profileImageUrl} />
          <div className='flex flex-col leading-snug'>
            <span className='text-sm font-semibold flex gap-2'>
              {tweet.author.name}
              <span className='text-sm font-normal opacity-70 group-hover:opacity-100 duration-300'>@{tweet.author.username}</span>
            </span>
            <span className='text-sm opacity-80 group-hover:opacity-100 duration-300'>{tweet.createdAt.toLocaleString()}</span>
          </div>
        </a>
      </div>
      <div className='text-lg my-3 leading-normal'>{tweet.text}</div>
      <div className='flex mt-2 gap-8 text-sm font-medium tracking-wider'>
        <span>{tweet.metrics.replies} Replies</span>
        <span>{tweet.metrics.retweets} Retweets</span>
        <span>{tweet.metrics.likes} Likes</span>
      </div>
    </div>
  )
}

export default Tweet
