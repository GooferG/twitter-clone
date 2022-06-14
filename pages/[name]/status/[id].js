import { getTweet } from 'lib/data';
import prisma from 'lib/prisma';
import Tweet from 'components/Tweet';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function SingleTweet({ tweet }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <div>
      <div className="text-center">
        <a href="/home" className="text-blue-600 font-bold">
          Home
        </a>
      </div>
      <p className="text-center text-blue-400 font-bold">Single Tweet View</p>
      <Tweet tweet={tweet} />
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

  return {
    props: {
      tweet,
    },
  };
}
