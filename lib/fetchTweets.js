export const fetchTweets = async (tweetIds = []) => {
  if (tweetIds.length === 0) return []

  const options = '&expansions=author_id&tweet.fields=public_metrics,created_at&user.fields=profile_image_url'

  const response = await fetch(`https://api.twitter.com/2/tweets/?ids=${tweetIds.join(',')}${options}`, { headers: { Authorization: `Bearer ${process.env.TWITTER_TOKEN}` } })
  const body = await response.json()
  const tweets = body.data.map((t) => {
    const author = body.includes.users.find((a) => a.id === t.author_id)
    return {
      id: t.id,
      text: t.text,
      createdAt: new Date(t.created_at).toLocaleDateString('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      }),
      metrics: {
        replies: formatMetric(t.public_metrics?.reply_count ?? 0),
        likes: formatMetric(t.public_metrics?.like_count ?? 0),
        retweets: formatMetric(t.public_metrics?.retweet_count ?? 0),
      },
      author: {
        name: author.name,
        username: author.username,
        profileImageUrl: author.profile_image_url,
      },
      url: `https://twitter.com/${author.username}/status/${t.id}`,
    }
  })

  return tweets
}

export const formatMetric = (number) => {
  if (number < 1000) {
    return number
  }
  if (number < 1000000) {
    return `${(number / 1000).toFixed(1)}K`
  }
  return `${(number / 1000000).toFixed(1)}M`
}
