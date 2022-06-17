import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import prisma from 'lib/prisma';
import { getTweets } from 'lib/data';
import Tweets from 'components/Tweets';

export default function Index({ tweets }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return null;
  }

  if (session) {
    router.push('/home');
  }

  return (
    <div>
      <h1 className="text-center mt-4 font-black text-blue-600 text-xl">
        Welcome to Twitcher
      </h1>
      <Tweets tweets={tweets} />
      <p className="text-center p-4 border m-4">
        <p className="font-black text-blue-600">You are not logged in!</p>
        <h2 className="mb-10">Join the conversation</h2>
        <a
          className="border px-8 py-2 mt-5 font-bold rounded-full color-accent-constrast bg-color-accent hover:bg-color-accent-hover-darker"
          href="/api/auth/signin"
        >
          login
        </a>
      </p>
    </div>
  );
}

export async function getServerSideProps() {
  const take = 3;
  let tweets = await getTweets(prisma, take);
  tweets = JSON.parse(JSON.stringify(tweets));

  tweets = JSON.parse(JSON.stringify(tweets));
  return {
    props: {
      tweets,
    },
  };
}
