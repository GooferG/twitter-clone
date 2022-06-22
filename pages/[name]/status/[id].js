import Tweet from 'components/Tweet';
import Tweets from 'components/Tweets';
import NewReply from 'components/NewReply';
import Link from 'next/link';

import { getTweet, getReplies } from 'lib/data';
import prisma from 'lib/prisma';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function SingleTweet({ tweet, replies }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (typeof window !== 'undefined' && tweet.parent) {
    router.push(`/${tweet.parent_data.author.name}/status/${tweet.parent}`);
  }

  return (
    <div>
      <div className="text-center">
        <Link href="/home">
          <a className="text-blue-600 font-bold">Home</a>
        </Link>
      </div>
      <p className="text-center text-blue-400 font-bold">Single Tweet View</p>
      <Tweet tweet={tweet} />
      <NewReply tweet={tweet} />

      {session && session.user.email === tweet.author.email && (
        <div className="flex-1 py-2 m-2 text-center"></div>
      )}

      <Tweets tweets={replies} nolink={true} />

      {session && session.user.email === tweet.author.email && (
        <div className="">
          <a
            href="#"
            className="border float-right ml-2 px-8 py-2 mt-0 mr-8 font-bold rounded-full color-accent-contrast bg-color-accent hover:bg-color-accent-hover"
            onClick={async () => {
              const res = await fetch('/api/tweet', {
                body: JSON.stringify({
                  id: tweet.id,
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
                method: 'DELETE',
              });

              if (res.status === 401) {
                alert('Unauthorized');
              }
              if (res.status === 200) {
                router.push('/home');
              }
            }}
          >
            delete ❌
          </a>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  let tweet = await getTweet(params.id, prisma);
  tweet = JSON.parse(JSON.stringify(tweet));

  let replies = await getReplies(params.id, prisma);
  replies = JSON.parse(JSON.stringify(replies));

  return {
    props: {
      tweet,
      replies,
    },
  };
}
