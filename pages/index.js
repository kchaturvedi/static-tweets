import Head from 'next/head'
import { fetchTweets } from 'lib/fetchTweets'
import Tweet from 'components/Tweet'

export default function Home({ tweets }) {
  const StaticTweet = ({ id }) => {
    const tweet = tweets.find((tweet) => tweet.id === id)
    return <Tweet tweet={tweet} />
  }

  return (
    <div>
      <Head>
        <title>Static Tweets</title>
      </Head>

      <main className='container max-w-4xl py-8'>
        <h1 className='font-bold text-4xl text-center'>Static Tweets</h1>
        <StaticTweet id='1516188493541785606' />
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const tweets = await fetchTweets(['1516188493541785606'])
  return {
    props: {
      tweets,
    },
  }
}
