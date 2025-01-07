import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  // State để theo dõi vị trí cuộn
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // Nếu cuộn xuống hơn 300px thì hiện nút
        setShowButton(true);
      } else {
        setShowButton(false); // Nếu cuộn lên đầu trang thì ẩn nút
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); // Dọn dẹp event listener khi component unmount
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Cuộn mượt mà
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 mb-[50px] rounded-full bg-black p-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out w-14 h-14 flex items-center justify-center  ${showButton ? 'block' : 'hidden'}`}
    >
      <i className="ri-arrow-up-line text-3xl"></i>
    </button>
  );
};

export default ScrollToTopButton;
