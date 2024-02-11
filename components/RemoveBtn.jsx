"use client";

import { HiOutlineTrash } from 'react-icons/hi';
import { useRouter } from 'next/navigation'; 

const RemoveBtn = ({ id }) => {
  const router = useRouter();

  const removeTopic = async () => {
    const confirmed = confirm('Are you sure?');

    if (confirmed) {
      try {
        const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          router.refresh();
        } else {
          console.error('Failed to delete topic');
        }
      } catch (error) {
        console.error('Error while deleting topic:', error);
      }
    }
  };

  return (
    <button onClick={removeTopic} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
};

export default RemoveBtn;
