import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function NewTweet() {
  const [content, setContent] = useState('');
  const { data: session } = useSession();

  //don't display if we're not logged in
  if (!session || !session.user) return null;

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        if (!content) {
          alert('No Content!');
          return;
        }

        alert(content);
      }}
    >
      <div className="flex">
        <div className="flex-1 px-1 pt-2 mt-2 mr-1 ml-1">
          <textarea
            className="border p-4 w-full text-lg font-medium bg-transparent outline-none color-primary"
            name="content"
            cols={50}
            rows={2}
            placeholder="What's happening?"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="flex">
        <div className="flex-1 mb-5">
          <button className="border float-right px-8 py-2 mt-0 mr-2 font-bold rounded-full">
            Tweet
          </button>
        </div>
      </div>
    </form>
  );
}
