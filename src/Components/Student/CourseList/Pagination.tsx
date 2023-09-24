import React from 'react';

interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage : Function;
  currentPage : number;
}

export const Pagination: React.FC<PaginationProps> = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i); // Add the value of i to the pages array
  }
  console.log('zzxxzzxx=',totalPosts, postsPerPage,currentPage);
  
  console.log('aaaaa=',pages);
  
  return (
    <div className='mb-1'>
    <div className="flex justify-end space-x-2 me-20">
        {
          pages.map((page,index)=>{
            return <button key={index} className="px-2 py-0 bg-blue-500 text-white rounded hover:bg-blue-600" 
            onClick={()=>setCurrentPage(page)}>{page}</button>
          })
        }
      
    </div>
    </div>
  );
}
