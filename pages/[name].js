import prisma from 'lib/prisma';
import { getUserTweets } from 'lib/data.js';
import Tweets from 'components/Tweets';
import Link from 'next/link';

export default function UserProfile({ name, tweets }) {
  return (
    <>
      <div className="text-center">
        <Link href="/home">
          <a className="text-blue-600 font-bold">Home</a>
        </Link>
      </div>

      <p className="text-center p-5"> User profile of {name}</p>
      <Tweets tweets={tweets} />
    </>
  );
}

export async function getServerSideProps({ params }) {
  let tweets = await getUserTweets(params.name, prisma);
  tweets = JSON.parse(JSON.stringify(tweets));

  return {
    props: {
      name: params.name,
      tweets,
    },
  };
}
