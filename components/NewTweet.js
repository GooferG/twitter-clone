import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function NewTweet() {
  const [content, setContent] = useState('');
  const { data: session } = useSession();

  //don't display if we're not logged in
  if (!session || !session.user) return null;

  //display form if logged in. (tweet box)
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        if (!content) {
          alert('No Content!');
          return;
        }

        alert(
          fetch('api/tweet', {
            body: JSON.stringify({
              content,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })
        );
      }}
    >
      <div className="flex">
        <div className="flex-1 px-1 pt-2 mt-2 mr-1 ml-1">
          <textarea
            className="border rounded-lg p-4 w-full text-lg font-medium bg-transparent outline-none color-primary"
            rows={2}
            cols={50}
            placeholder="What's happening?"
            name="content"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="flex">
        <div className="flex-1 mb-5">
          <button className="border px-8 py-2 mt-0 mr-2 font-bold rounded-full">
            Tweet
          </button>
        </div>
      </div>
    </form>
  );
}
