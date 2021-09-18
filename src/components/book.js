import React, { useState } from "react";
import HTMLFlipBook from "react-pageflip";

const pageStyle = {
  padding: "20px",
  backgroundColor: "#fdfaf7",
  transformStyle: "preserve-3d",
  color: "#785e3a",
  border: "1px solid #c2b5a3",
  overflow: "hidden",
};

const leftPage = {
  borderRight: "0",
  boxShadow: "inset -7px 0 30px -7px rgb(0 0 0 / 40%)",
};
const rightPage = {
  borderLeft: "0",
  boxShadow: "inset 7px 0 30px -7px rgb(0 0 0 / 40%)",
};
const coverStyle = {
  backgroundColor: "#e3d0b5",
  color: "#785e3a",
  border: "1px solid #998466",
  transformStyle: "preserve-3d",
};

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage" css={pageStyle} ref={ref}>
      <h1>Page Header</h1>
      <p>{props.children}</p>
      <p>Page number: {props.number}</p>
    </div>
  );
});

const Book = () => {
  const [page, setPage] = useState(0);
  const totalPage = 0;
  const onPage = (e) => {
    setPage(e.data);
  };
  return (
    <div>
      <HTMLFlipBook
        width={700}
        height={500}
        size="stretch"
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        onFlip={onPage}
        className="demo-book"
      >
        <div
          className="page page-cover"
          data-density="hard"
          style={{ coverStyle }}
        >
          Page cover
        </div>
        <Page number="1">Lorem ipsum..1</Page>
        <Page number="2">Lorem ipsum..2</Page>
        <div style={{ coverStyle }} data-density="hard">
          THE END
        </div>
      </HTMLFlipBook>
    </div>
  );
};

export default Book;
