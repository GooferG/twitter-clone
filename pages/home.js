const { useSession } = require('next-auth/react');
import NewTweet from 'components/NewTweet';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>loading, bitch...</p>;
  }

  return <div>{session ? <NewTweet /> : <p>You are not logged in 😢 </p>}</div>;
}
